// frontend/src/hooks/useContract.js
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Contract from '@truffle/contract';
import HealthcareRecordsABI from '../contracts/HealthcareRecords.json';
import AccessControlABI from '../contracts/AccessControl.json';

export const useContract = () => {
  const [healthcareContract, setHealthcareContract] = useState(null);
  const [accessContract, setAccessContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const { web3 } = useSelector(state => state.web3);

  useEffect(() => {
    const initializeContracts = async () => {
      if (web3) {
        try {
          // Healthcare Records Contract
          const healthcareContractDef = Contract(HealthcareRecordsABI);
          healthcareContractDef.setProvider(web3.currentProvider);
          const healthcareInstance = await healthcareContractDef.at(
            process.env.REACT_APP_HEALTHCARE_CONTRACT_ADDRESS
          );
          setHealthcareContract(healthcareInstance);

          // Access Control Contract
          const accessContractDef = Contract(AccessControlABI);
          accessContractDef.setProvider(web3.currentProvider);
          const accessInstance = await accessContractDef.at(
            process.env.REACT_APP_ACCESS_CONTROL_CONTRACT_ADDRESS
          );
          setAccessContract(accessInstance);

          setLoading(false);
        } catch (error) {
          console.error('Error initializing contracts:', error);
          setLoading(false);
        }
      }
    };

    initializeContracts();
  }, [web3]);

  return {
    healthcareContract,
    accessContract,
    loading
  };
};