// services/pinataService.js

import { PinataSDK } from "pinata";
import { Blob } from "buffer";
import { Readable } from "stream";
import dotenv from "dotenv";
import crypto from "crypto";

// services/pinataService.js
// import { Pinata } from "@pinata/sdk";
// import pinataSdk from "@pinata/sdk";
// const { Pinata } = pinataSdk;

dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

// const pinata = new Pinata({
//   pinataJWTKey: process.env.PINATA_JWT,
//   gateway: {
//     url: process.env.GATEWAY_URL, // e.g., https://gateway.pinata.cloud
//   },
// });

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
// export async function downloadFromIPFS(cid, encryptionKey) {
//   try {
//     const response = await pinata.gateways.public.get(cid, {
//       responseType: "arraybuffer",
//     });
//     const data = Buffer.from(response.data);

//     const iv = data.subarray(0, 16);
//     const encryptedData = data.subarray(16);
//     const decrypted = decryptBuffer(encryptedData, encryptionKey, iv);

//     return {
//       success: true,
//       data: decrypted,
//     };
//   } catch (err) {
//     console.error("Download from IPFS failed:", err);
//     return { success: false, error: err.message };
//   }
// }

export const downloadFromIPFS = async (cid) => {
  try {
    const response = await pinata.gateways.public.get(cid);
    return response.data; // This is already a buffer or JSON
  } catch (error) {
    console.error("Download from IPFS failed:", error.message);
    throw new Error("Failed to fetch file from IPFS: " + error.message);
  }
};

// export const downloadFromIPFS = async (cid) => {
//   try {
//     const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
//     const res = await fetch(url);

//     if (!res.ok) {
//       throw new Error(`Failed to fetch file from IPFS: ${res.statusText}`);
//     }

//     const arrayBuffer = await res.arrayBuffer(); // ✅ Use this
//     const fileBuffer = Buffer.from(arrayBuffer); // ✅ Convert correctly
//     return fileBuffer;
//   } catch (error) {
//     console.error("Download from IPFS failed:", error);
//     throw error;
//   }
// };

// =========================================================
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
