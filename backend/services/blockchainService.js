// backend/services/blockchainService.js
import Web3 from "web3";
import contract from "@truffle/contract";
import HealthcareRecordsABI from "../../smart-contracts/contracts/HealthcareRecords.json";
// import HealthcareRecordsABI from "../contracts/HealthcareRecords.json";
//  assert { type: "json" };
import AccessControlABI from "../contracts/AccessControl.json";
//  assert { type: "json" };

class BlockchainService {
  constructor() {
    this.web3 = new Web3(
      process.env.BLOCKCHAIN_RPC_URL || "http://localhost:8545"
    );
    this.healthcareContract = null;
    this.accessControlContract = null;
    this.initializeContracts();
  }

  async initializeContracts() {
    try {
      // Initialize Healthcare Records Contract
      const HealthcareContract = contract(HealthcareRecordsABI);
      HealthcareContract.setProvider(this.web3.currentProvider);
      this.healthcareContract = await HealthcareContract.at(
        process.env.HEALTHCARE_CONTRACT_ADDRESS
      );

      // Initialize Access Control Contract
      const AccessContract = contract(AccessControlABI);
      AccessContract.setProvider(this.web3.currentProvider);
      this.accessControlContract = await AccessContract.at(
        process.env.ACCESS_CONTROL_CONTRACT_ADDRESS
      );

      console.log("Blockchain contracts initialized successfully");
    } catch (error) {
      console.error("Failed to initialize contracts:", error);
    }
  }

  async registerPatient(patientWallet, encryptedProfile, privateKey) {
    try {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this.web3.eth.accounts.wallet.add(account);

      const gasEstimate =
        await this.healthcareContract.registerPatient.estimateGas(
          encryptedProfile,
          { from: account.address }
        );

      const tx = await this.healthcareContract.registerPatient(
        encryptedProfile,
        {
          from: account.address,
          gas: gasEstimate,
          gasPrice: await this.web3.eth.getGasPrice(),
        }
      );

      return {
        success: true,
        transactionHash: tx.tx,
        blockNumber: tx.receipt.blockNumber,
      };
    } catch (error) {
      console.error("Error registering patient:", error);
      return { success: false, error: error.message };
    }
  }

  async createMedicalRecord(
    patientWallet,
    providerWallet,
    ipfsHash,
    recordType,
    providerPrivateKey
  ) {
    try {
      const account =
        this.web3.eth.accounts.privateKeyToAccount(providerPrivateKey);
      this.web3.eth.accounts.wallet.add(account);

      const gasEstimate =
        await this.healthcareContract.createMedicalRecord.estimateGas(
          patientWallet,
          ipfsHash,
          recordType,
          { from: account.address }
        );

      const tx = await this.healthcareContract.createMedicalRecord(
        patientWallet,
        ipfsHash,
        recordType,
        {
          from: account.address,
          gas: gasEstimate,
          gasPrice: await this.web3.eth.getGasPrice(),
        }
      );

      return {
        success: true,
        transactionHash: tx.tx,
        recordId: tx.logs[0].args.recordId.toString(),
        blockNumber: tx.receipt.blockNumber,
      };
    } catch (error) {
      console.error("Error creating medical record:", error);
      return { success: false, error: error.message };
    }
  }

  async grantAccess(
    patientWallet,
    providerWallet,
    duration,
    canRead,
    canWrite,
    patientPrivateKey
  ) {
    try {
      const account =
        this.web3.eth.accounts.privateKeyToAccount(patientPrivateKey);
      this.web3.eth.accounts.wallet.add(account);

      const gasEstimate = await this.healthcareContract.grantAccess.estimateGas(
        providerWallet,
        duration,
        canRead,
        canWrite,
        { from: account.address }
      );

      const tx = await this.healthcareContract.grantAccess(
        providerWallet,
        duration,
        canRead,
        canWrite,
        {
          from: account.address,
          gas: gasEstimate,
          gasPrice: await this.web3.eth.getGasPrice(),
        }
      );

      return {
        success: true,
        transactionHash: tx.tx,
        blockNumber: tx.receipt.blockNumber,
      };
    } catch (error) {
      console.error("Error granting access:", error);
      return { success: false, error: error.message };
    }
  }

  async getPatientRecords(patientWallet, providerWallet) {
    try {
      const records = await this.healthcareContract.getPatientRecords(
        patientWallet,
        { from: providerWallet }
      );
      return { success: true, records };
    } catch (error) {
      console.error("Error fetching patient records:", error);
      return { success: false, error: error.message };
    }
  }

  async checkAccess(patientWallet, providerWallet) {
    try {
      const permissionKey = this.web3.utils.soliditySha3(
        patientWallet,
        providerWallet
      );
      const permission = await this.healthcareContract.accessPermissions(
        permissionKey
      );

      const currentTime = Math.floor(Date.now() / 1000);
      const hasAccess =
        permission.isActive &&
        permission.expirationTime.toNumber() > currentTime;

      return {
        success: true,
        hasAccess,
        permission: {
          canRead: permission.canRead,
          canWrite: permission.canWrite,
          expirationTime: permission.expirationTime.toNumber(),
        },
      };
    } catch (error) {
      console.error("Error checking access:", error);
      return { success: false, error: error.message };
    }
  }
}

// Export the singleton instance
const blockchainService = new BlockchainService();
export default blockchainService;
