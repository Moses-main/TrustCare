// frontend/src/hooks/useWeb3.js
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { setWeb3, setAccounts, setNetworkId } from '../store/slices/web3Slice';

export const useWeb3 = () => {
  const [loading, setLoading] = useState(true);
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initializeWeb3 = useCallback(async () => {
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        
        dispatch(setWeb3(web3));
        dispatch(setAccounts(accounts));
        dispatch(setNetworkId(networkId));
        
        setIsWeb3Enabled(true);
        
        // Listen for account changes
        provider.on('accountsChanged', (newAccounts) => {
          dispatch(setAccounts(newAccounts));
          if (newAccounts.length === 0) {
            // User disconnected wallet
            setIsWeb3Enabled(false);
          }
        });
        
        // Listen for network changes
        provider.on('chainChanged', async (chainId) => {
          const networkId = parseInt(chainId, 16);
          dispatch(setNetworkId(networkId));
          window.location.reload(); // Refresh to reset app state
        });
        
      } else {
        setError('Please install MetaMask or another Web3 wallet');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        await initializeWeb3();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const switchNetwork = async (chainId) => {
    try {
      const provider = await detectEthereumProvider();
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, [initializeWeb3]);

  return {
    loading,
    isWeb3Enabled,
    error,
    connectWallet,
    switchNetwork
  };
};