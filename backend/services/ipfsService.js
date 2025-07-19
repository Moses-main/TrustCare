// backend/services/ipfsService.js
import { create } from "ipfs-http-client";
import CryptoJS from "crypto-js";

class IPFSService {
  constructor() {
    this.ipfs = create({
      host: process.env.IPFS_HOST || "localhost",
      port: process.env.IPFS_PORT || 5001,
      protocol: process.env.IPFS_PROTOCOL || "http",
    });
  }

  async uploadFile(fileBuffer, fileName, encryptionKey) {
    try {
      // Encrypt file before uploading
      console.log(
        "Uploading to IPFS at:",
        this.ipfs.getEndpointConfig?.() || "default config"
      );

      const encryptedData = CryptoJS.AES.encrypt(
        fileBuffer.toString("base64"),
        encryptionKey
      ).toString();

      const file = {
        path: fileName,
        content: Buffer.from(encryptedData, "utf8"),
      };

      const result = await this.ipfs.add(file);

      return {
        success: true,
        hash: result.cid.toString(),
        size: result.size,
      };
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      return { success: false, error: error.message };
    }
  }

  async downloadFile(hash, encryptionKey) {
    try {
      const chunks = [];
      for await (const chunk of this.ipfs.cat(hash)) {
        chunks.push(chunk);
      }

      const encryptedData = Buffer.concat(chunks).toString("utf8");
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return {
        success: true,
        data: Buffer.from(decryptedData, "base64"),
      };
    } catch (error) {
      console.error("Error downloading from IPFS:", error);
      return { success: false, error: error.message };
    }
  }

  async pinFile(hash) {
    try {
      await this.ipfs.pin.add(hash);
      return { success: true };
    } catch (error) {
      console.error("Error pinning file:", error);
      return { success: false, error: error.message };
    }
  }
}

const ipfsService = new IPFSService();
export default ipfsService;
