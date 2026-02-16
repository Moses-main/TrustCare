// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AccessControl.sol";
import "./PatientRecords.sol";
import "./ProviderManagement.sol";

/**
 * @title HealthcareRecords
 * @dev Main contract that orchestrates the decentralized healthcare records system
 */
contract HealthcareRecords {
    AccessControl public accessControl;
    PatientRecords public patientRecords;
    ProviderManagement public providerManagement;
    
    address public owner;
    uint256 public totalPatients;
    uint256 public totalProviders;
    
    // Events
    event SystemInitialized(address indexed owner, uint256 timestamp);
    event PatientRegistered(address indexed patient, uint256 timestamp);
    event ProviderRegistered(address indexed provider, uint256 timestamp);
    event RecordAccessed(address indexed patient, address indexed provider, uint256 timestamp);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyRegisteredPatient() {
        require(patientRecords.isPatientRegistered(msg.sender), "Patient not registered");
        _;
    }
    
    modifier onlyRegisteredProvider() {
        require(providerManagement.isProviderRegistered(msg.sender), "Provider not registered");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        
        // Deploy component contracts
        accessControl = new AccessControl();
        patientRecords = new PatientRecords();
        providerManagement = new ProviderManagement();
        
        // Set contract relationships
        patientRecords.setAccessControl(address(accessControl));
        accessControl.setPatientRecords(address(patientRecords));
        accessControl.setProviderManagement(address(providerManagement));
        
        emit SystemInitialized(owner, block.timestamp);
    }
    
    /**
     * @dev Register a new patient
     * @param _name Patient's name
     * @param _dateOfBirth Patient's date of birth
     * @param _bloodType Patient's blood type
     * @param _allergies Patient's allergies
     * @param _emergencyContact Emergency contact information
     */
    function registerPatient(
        string memory _name,
        string memory _dateOfBirth,
        string memory _bloodType,
        string memory _allergies,
        string memory _emergencyContact
    ) external {
        require(!patientRecords.isPatientRegistered(msg.sender), "Patient already registered");
        
        patientRecords.registerPatient(
            msg.sender,
            _name,
            _dateOfBirth,
            _bloodType,
            _allergies,
            _emergencyContact
        );
        
        totalPatients++;
        emit PatientRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Register a new healthcare provider
     * @param _name Provider's name
     * @param _specialization Provider's specialization
     * @param _licenseNumber Provider's license number
     * @param _hospitalAffiliation Hospital affiliation
     */
    function registerProvider(
        string memory _name,
        string memory _specialization,
        string memory _licenseNumber,
        string memory _hospitalAffiliation
    ) external {
        require(!providerManagement.isProviderRegistered(msg.sender), "Provider already registered");
        
        providerManagement.registerProvider(
            msg.sender,
            _name,
            _specialization,
            _licenseNumber,
            _hospitalAffiliation
        );
        
        totalProviders++;
        emit ProviderRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Add a medical record
     * @param _recordType Type of medical record
     * @param _description Description of the record
     * @param _ipfsHash IPFS hash of the medical file
     * @param _diagnosis Diagnosis information
     * @param _treatment Treatment information
     */
    function addMedicalRecord(
        string memory _recordType,
        string memory _description,
        string memory _ipfsHash,
        string memory _diagnosis,
        string memory _treatment
    ) external onlyRegisteredPatient {
        patientRecords.addMedicalRecord(
            msg.sender,
            _recordType,
            _description,
            _ipfsHash,
            _diagnosis,
            _treatment
        );
    }
    
    /**
     * @dev Grant access to a healthcare provider
     * @param _provider Provider's address
     * @param _permissions Permissions to grant
     * @param _expiryTime Expiry time for access
     */
    function grantAccess(
        address _provider,
        uint256 _permissions,
        uint256 _expiryTime
    ) external onlyRegisteredPatient {
        require(providerManagement.isProviderRegistered(_provider), "Provider not registered");
        require(_expiryTime > block.timestamp, "Expiry time must be in the future");
        
        accessControl.grantAccess(msg.sender, _provider, _permissions, _expiryTime);
    }
    
    /**
     * @dev Revoke access from a healthcare provider
     * @param _provider Provider's address
     */
    function revokeAccess(address _provider) external onlyRegisteredPatient {
        accessControl.revokeAccess(msg.sender, _provider);
    }
    
    /**
     * @dev Access patient records (for healthcare providers)
     * @param _patient Patient's address
     * @return Patient's medical records
     */
    function accessPatientRecords(address _patient) 
        external 
        onlyRegisteredProvider 
        returns (PatientRecords.MedicalRecord[] memory) 
    {
        require(accessControl.hasAccess(_patient, msg.sender), "Access denied");
        
        emit RecordAccessed(_patient, msg.sender, block.timestamp);
        return patientRecords.getPatientRecords(_patient);
    }
    
    /**
     * @dev Get patient's own records
     * @return Patient's medical records
     */
    function getMyRecords() external onlyRegisteredPatient returns (PatientRecords.MedicalRecord[] memory) {
        return patientRecords.getPatientRecords(msg.sender);
    }
    
    /**
     * @dev Get patient basic information
     * @param _patient Patient's address
     * @return Patient's basic information
     */
    function getPatientInfo(address _patient) 
        external 
        view 
        onlyRegisteredProvider 
        returns (PatientRecords.Patient memory) 
    {
        require(accessControl.hasAccess(_patient, msg.sender), "Access denied");
        return patientRecords.getPatientInfo(_patient);
    }
    
    /**
     * @dev Get provider information
     * @param _provider Provider's address
     * @return Provider's information
     */
    function getProviderInfo(address _provider) 
        external 
        view 
        returns (ProviderManagement.Provider memory) 
    {
        return providerManagement.getProviderInfo(_provider);
    }
    
    /**
     * @dev Get access permissions for a patient-provider pair
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @return Access permissions details
     */
    function getAccessPermissions(address _patient, address _provider) 
        external 
        view 
        returns (AccessControl.AccessPermission memory) 
    {
        require(
            msg.sender == _patient || msg.sender == _provider || msg.sender == owner,
            "Unauthorized access"
        );
        return accessControl.getAccessPermissions(_patient, _provider);
    }
    
        
    /**
    * @dev Returns overall system statistics.
    * @return _totalPatients Total number of patients
    * @return _totalProviders Total number of providers
    * @return _accessControlAddress Address of the AccessControl contract
    * @return _patientRecordsAddress Address of the PatientRecords contract
    * @return _providerManagementAddress Address of the ProviderManagement contract
    */

    function getSystemStats() external view returns (
        uint256 _totalPatients,
        uint256 _totalProviders,
        address _accessControlAddress,
        address _patientRecordsAddress,
        address _providerManagementAddress
    ) {
        return (
            totalPatients,
            totalProviders,
            address(accessControl),
            address(patientRecords),
            address(providerManagement)
        );
    }
    
    /**
     * @dev Emergency access function (only owner)
     * @param _patient Patient's address
     * @return Patient's medical records
     */
    function emergencyAccess(address _patient) 
        external 
        onlyOwner 
        returns (PatientRecords.MedicalRecord[] memory) 
    {
        return patientRecords.getPatientRecords(_patient);
    }
    
    /**
     * @dev Update contract addresses (only owner)
     * @param _accessControl New access control contract address
     * @param _patientRecords New patient records contract address
     * @param _providerManagement New provider management contract address
     */
    function updateContractAddresses(
        address _accessControl,
        address _patientRecords,
        address _providerManagement
    ) external onlyOwner {
        accessControl = AccessControl(_accessControl);
        patientRecords = PatientRecords(_patientRecords);
        providerManagement = ProviderManagement(_providerManagement);
    }
}