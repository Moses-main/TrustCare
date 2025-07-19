// services/pinataService.js

import { PinataSDK } from "pinata";
import { Blob } from "buffer";
import { Readable } from "stream";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

// Utility: Encrypt a buffer with AES-256
function encryptBuffer(buffer, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { iv, encryptedData: encrypted };
}

// Utility: Decrypt a buffer with AES-256
function decryptBuffer(buffer, key, iv) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return decrypted;
}

// Upload to IPFS via Pinata
export async function uploadToIPFS(buffer, fileName, encryptionKey) {
  console.log(process.env.PINATA_JWT);
  console.log(process.env.GATEWAY_URL);

  try {
    const { iv, encryptedData } = encryptBuffer(buffer, encryptionKey);
    const payload = new Blob([iv, encryptedData]);
    const file = new File([payload], fileName, {
      type: "application/octet-stream",
    });

    const upload = await pinata.upload.public.file(file);
    return {
      success: true,
      hash: upload.cid,
    };
  } catch (err) {
    console.error("Upload to IPFS failed:", err);
    return { success: false, error: err.message };
  }
}

// Download from IPFS via Pinata
export async function downloadFromIPFS(cid, encryptionKey) {
  try {
    const response = await pinata.gateways.public.get(cid, {
      responseType: "arraybuffer",
    });
    const data = Buffer.from(response.data);

    const iv = data.subarray(0, 16);
    const encryptedData = data.subarray(16);
    const decrypted = decryptBuffer(encryptedData, encryptionKey, iv);

    return {
      success: true,
      data: decrypted,
    };
  } catch (err) {
    console.error("Download from IPFS failed:", err);
    return { success: false, error: err.message };
  }
}

// Optionally: reupload an encrypted JSON object
export async function reuploadEncryptedJSON(jsonObject, encryptionKey) {
  try {
    const jsonString = JSON.stringify(jsonObject);
    const { iv, encryptedData } = encryptBuffer(
      Buffer.from(jsonString),
      encryptionKey
    );
    const payload = new Blob([iv, encryptedData]);
    const file = new File([payload], "reupload.json", {
      type: "application/json",
    });

    const upload = await pinata.upload.public.file(file);
    return {
      success: true,
      hash: upload.cid,
    };
  } catch (err) {
    console.error("Reupload to IPFS failed:", err);
    return { success: false, error: err.message };
  }
}
