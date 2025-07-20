import MedicalRecord from "../models/MedicalRecord.js";
import blockchainService from "../services/blockchainService.js";
import {
  uploadToIPFS,
  downloadFromIPFS,
  reuploadEncryptedJSON,
} from "../services/pinataService.js";
import crypto from "crypto";

export const createMedicalRecord = async (req, res) => {
  try {
    const { patientWallet, recordType, metadata, clinical } = req.body;

    // Validate file input
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Permission check
    const accessCheck = await blockchainService.checkAccess(
      patientWallet,
      req.user.walletAddress
    );
    if (!accessCheck.success || !accessCheck.permission.canWrite) {
      return res
        .status(403)
        .json({ error: "No write access to patient records" });
    }

    // Encryption key
    const encryptionKey = crypto.randomBytes(32).toString("hex");

    // Upload encrypted file to IPFS
    const ipfsResult = await uploadToIPFS(
      req.file.buffer,
      req.file.originalname,
      encryptionKey
    );

    if (!ipfsResult.success) {
      return res.status(500).json({ error: "Failed to upload file to IPFS" });
    }

    // Write to blockchain
    const blockchainResult = await blockchainService.createMedicalRecord(
      patientWallet,
      req.user.walletAddress,
      ipfsResult.hash,
      recordType,
      req.user.privateKey
    );
    if (!blockchainResult.success) {
      return res
        .status(500)
        .json({ error: "Failed to create record on blockchain" });
    }

    // Parse metadata and clinical info
    let parsedMetadata = {};
    let parsedClinical = {};
    try {
      parsedMetadata = JSON.parse(metadata);
      parsedClinical = JSON.parse(clinical);
    } catch (e) {
      return res
        .status(400)
        .json({ error: "Invalid metadata or clinical JSON." });
    }

    // Save in DB
    const medicalRecord = new MedicalRecord({
      recordId: blockchainResult.recordId,
      blockchainTxHash: blockchainResult.transactionHash,
      patientWallet,
      providerWallet: req.user.walletAddress,
      ipfsHash: ipfsResult.hash,
      recordType,
      metadata: {
        ...parsedMetadata,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        encryptionKey,
      },
      clinical: parsedClinical,
      status: "finalized",
      isActive: true,
    });

    await medicalRecord.save();

    req.io?.to(patientWallet).emit("new-record", {
      recordId: blockchainResult.recordId,
      provider: req.user.walletAddress,
      recordType,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      recordId: blockchainResult.recordId,
      transactionHash: blockchainResult.transactionHash,
      ipfsHash: ipfsResult.hash,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientRecords = async (req, res) => {
  try {
    const { patientWallet } = req.params;

    const accessCheck = await blockchainService.checkAccess(
      patientWallet,
      req.user.walletAddress
    );
    if (!accessCheck.success || !accessCheck.permission.canRead) {
      return res
        .status(403)
        .json({ error: "No read access to patient records" });
    }

    const records = await MedicalRecord.find({
      patientWallet,
      isActive: true,
    }).sort({ createdAt: -1 });

    await MedicalRecord.updateMany(
      { patientWallet, isActive: true },
      {
        $push: {
          accessLog: {
            accessedBy: req.user.walletAddress,
            accessTime: new Date(),
            action: "view",
            ipAddress: req.ip,
          },
        },
      }
    );

    res.status(200).json({ count: records.length, records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadMedicalRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;

    const record = await MedicalRecord.findOne({ recordId });
    if (!record) return res.status(404).json({ message: "Record not found" });
    // console.log(record.ipfsHash);
    const cid = record.ipfsHash || record.metadata.ipfsHash; // Adjust based on your schema

    const fileBuffer = await downloadFromIPFS(cid);

    // Determine file type for headers (adjust as needed)
    const fileName =
      `${record.recordType}_${record._id}.json` ||
      `${record.recordType}_${record._id}.pdf`; // or .pdf, etc.

    res.set({
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/octet-stream",
    });

    res.send(fileBuffer);
  } catch (error) {
    console.error("Download error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to download file", error: error.message });
  }
};
