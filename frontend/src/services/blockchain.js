import api from './api';

// Blockchain API
export const blockchainAPI = {
  // Wallet Operations
  connectWallet: () => window.ethereum.request({ method: 'eth_requestAccounts' }),
  getWalletAddress: () => window.ethereum.selectedAddress,
  
  // Smart Contract Interactions
  getContract: (contractName) => api.get(`/blockchain/contracts/${contractName}`),
  
  // Record Verification
  verifyRecord: (recordId) => api.get(`/blockchain/records/${recordId}/verify`),
  
  // Access Control
  grantAccess: (recordId, walletAddress) => 
    api.post(`/blockchain/records/${recordId}/access`, { walletAddress }),
  
  revokeAccess: (recordId, walletAddress) => 
    api.delete(`/blockchain/records/${recordId}/access/${walletAddress}`),
  
  // Transaction History
  getTransactionHistory: (walletAddress) => 
    api.get(`/blockchain/transactions/${walletAddress}`),
  
  // Token Operations (if applicable)
  getTokenBalance: (walletAddress) => 
    api.get(`/blockchain/tokens/balance/${walletAddress}`),
  
  transferTokens: (toAddress, amount) => 
    api.post('/blockchain/tokens/transfer', { toAddress, amount })
};

export default blockchainAPI;
