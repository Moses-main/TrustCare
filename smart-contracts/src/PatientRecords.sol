// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PatientRecords
 * @dev Contract for managing patient medical records
 */
contract PatientRecords {
    address public owner;
    address public accessControlContract;
    
    struct Patient {
        address patientAddress;
        string name;
        string dateOfBirth;
        string bloodType;
        string allergies;
        string emergencyContact;
        uint256 registrationTime;
        bool isRegistered;
    }
    
    struct MedicalRecord {
        uint256 recordId;
        address patient;
        address addedBy;
        string recordType;
        string description;
        string ipfsHash;
        string diagnosis;
        string treatment;
        uint256 timestamp;
        bool isActive;
    }
    
    // Mappings
    mapping(address => Patient) public patients;
    mapping(address => MedicalRecord[]) public patientRecords;
    mapping(address => bool) public registeredPatients;
    
    // Counters
    uint256 public totalRecords;
    uint256 public recordIdCounter;
    
    // Events
    event PatientRegistered(address indexed patient, string name, uint256 timestamp);
    event MedicalRecordAdded(address indexed patient, uint256 recordId, string recordType, uint256 timestamp);
    event MedicalRecordUpdated(address indexed patient, uint256 recordId, uint256 timestamp);
    event PatientInfoUpdated(address indexed patient, uint256 timestamp);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyRegisteredPatient(address _patient) {
        require(registeredPatients[_patient], "Patient not registered");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || 
            msg.sender == accessControlContract ||
            registeredPatients[msg.sender],
            "Unauthorized access"
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
        recordIdCounter = 1;
    }
    
    /**
     * @dev Set access control contract address
     * @param _accessControl Address of the access control contract
     */
    function setAccessControl(address _accessControl) external onlyOwner {
        accessControlContract = _accessControl;
    }
    
    /**
     * @dev Register a new patient
     * @param _patientAddress Patient's wallet address
     * @param _name Patient's name
     * @param _dateOfBirth Patient's date of birth
     * @param _bloodType Patient's blood type
     * @param _allergies Patient's allergies
     * @param _emergencyContact Emergency contact information
     */
    function registerPatient(
        address _patientAddress,
        string memory _name,
        string memory _dateOfBirth,
        string memory _bloodType,
        string memory _allergies,
        string memory _emergencyContact
    ) external onlyAuthorized {
        require(!registeredPatients[_patientAddress], "Patient already registered");
        require(_patientAddress != address(0), "Invalid patient address");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        patients[_patientAddress] = Patient({
            patientAddress: _patientAddress,
            name: _name,
            dateOfBirth: _dateOfBirth,
            bloodType: _bloodType,
            allergies: _allergies,
            emergencyContact: _emergencyContact,
            registrationTime: block.timestamp,
            isRegistered: true
        });
        
        registeredPatients[_patientAddress] = true;
        
        emit PatientRegistered(_patientAddress, _name, block.timestamp);
    }
    
    /**
     * @dev Add a medical record for a patient
     * @param _patient Patient's address
     * @param _recordType Type of medical record
     * @param _description Description of the record
     * @param _ipfsHash IPFS hash of the medical file
     * @param _diagnosis Diagnosis information
     * @param _treatment Treatment information
     */
    function addMedicalRecord(
        address _patient,
        string memory _recordType,
        string memory _description,
        string memory _ipfsHash,
        string memory _diagnosis,
        string memory _treatment
    ) external onlyRegisteredPatient(_patient) {
        require(
            msg.sender == _patient || 
            msg.sender == accessControlContract ||
            msg.sender == owner,
            "Unauthorized to add record"
        );
        require(bytes(_recordType).length > 0, "Record type cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        MedicalRecord memory newRecord = MedicalRecord({
            recordId: recordIdCounter,
            patient: _patient,
            addedBy: msg.sender,
            recordType: _recordType,
            description: _description,
            ipfsHash: _ipfsHash,
            diagnosis: _diagnosis,
            treatment: _treatment,
            timestamp: block.timestamp,
            isActive: true
        });
        
        patientRecords[_patient].push(newRecord);
        totalRecords++;
        
        emit MedicalRecordAdded(_patient, recordIdCounter, _recordType, block.timestamp);
        recordIdCounter++;
    }
    
    /**
     * @dev Update patient information
     * @param _patient Patient's address
     * @param _name New name
     * @param _allergies New allergies
     * @param _emergencyContact New emergency contact
     */
    function updatePatientInfo(
        address _patient,
        string memory _name,
        string memory _allergies,
        string memory _emergencyContact
    ) external onlyRegisteredPatient(_patient) {
        require(msg.sender == _patient, "Only patient can update their info");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        patients[_patient].name = _name;
        patients[_patient].allergies = _allergies;
        patients[_patient].emergencyContact = _emergencyContact;
        
        emit PatientInfoUpdated(_patient, block.timestamp);
    }
    
    /**
     * @dev Update a medical record
     * @param _patient Patient's address
     * @param _recordId Record ID to update
     * @param _description New description
     * @param _diagnosis New diagnosis
     * @param _treatment New treatment
     */
    function updateMedicalRecord(
        address _patient,
        uint256 _recordId,
        string memory _description,
        string memory _diagnosis,
        string memory _treatment
    ) external onlyRegisteredPatient(_patient) {
        require(msg.sender == _patient, "Only patient can update their records");
        
        MedicalRecord[] storage records = patientRecords[_patient];
        bool recordFound = false;
        
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].recordId == _recordId && records[i].isActive) {
                records[i].description = _description;
                records[i].diagnosis = _diagnosis;
                records[i].treatment = _treatment;
                recordFound = true;
                break;
            }
        }
        
        require(recordFound, "Record not found or inactive");
        emit MedicalRecordUpdated(_patient, _recordId, block.timestamp);
    }
    
    /**
     * @dev Deactivate a medical record
     * @param _patient Patient's address
     * @param _recordId Record ID to deactivate
     */
    function deactivateRecord(address _patient, uint256 _recordId) external {
        require(msg.sender == _patient, "Only patient can deactivate their records");
        require(registeredPatients[_patient], "Patient not registered");
        
        MedicalRecord[] storage records = patientRecords[_patient];
        bool recordFound = false;
        
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].recordId == _recordId) {
                records[i].isActive = false;
                recordFound = true;
                break;
            }
        }
        
        require(recordFound, "Record not found");
    }
    
    /**
     * @dev Get patient information
     * @param _patient Patient's address
     * @return Patient information
     */
    function getPatientInfo(address _patient) external view returns (Patient memory) {
        require(registeredPatients[_patient], "Patient not registered");
        return patients[_patient];
    }
    
    /**
     * @dev Get all medical records for a patient
     * @param _patient Patient's address
     * @return Array of medical records
     */
    function getPatientRecords(address _patient) external view returns (MedicalRecord[] memory) {
        require(registeredPatients[_patient], "Patient not registered");
        return patientRecords[_patient];
    }
    
    /**
     * @dev Get active medical records for a patient
     * @param _patient Patient's address
     * @return Array of active medical records
     */
    function getActiveRecords(address _patient) external view returns (MedicalRecord[] memory) {
        require(registeredPatients[_patient], "Patient not registered");
        
        MedicalRecord[] memory allRecords = patientRecords[_patient];
        uint256 activeCount = 0;
        
        // Count active records
        for (uint256 i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active records
        MedicalRecord[] memory activeRecords = new MedicalRecord[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isActive) {
                activeRecords[currentIndex] = allRecords[i];
                currentIndex++;
            }
        }
        
        return activeRecords;
    }
    
    /**
     * @dev Get a specific medical record
     * @param _patient Patient's address
     * @param _recordId Record ID
     * @return Medical record
     */
    function getRecord(address _patient, uint256 _recordId) external view returns (MedicalRecord memory) {
        require(registeredPatients[_patient], "Patient not registered");
        
        MedicalRecord[] memory records = patientRecords[_patient];
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].recordId == _recordId) {
                return records[i];
            }
        }
        
        revert("Record not found");
    }
    
    /**
     * @dev Get records by type
     * @param _patient Patient's address
     * @param _recordType Type of record to filter
     * @return Array of medical records of specified type
     */
    function getRecordsByType(address _patient, string memory _recordType) 
        external 
        view 
        returns (MedicalRecord[] memory) 
    {
        require(registeredPatients[_patient], "Patient not registered");
        
        MedicalRecord[] memory allRecords = patientRecords[_patient];
        uint256 matchingCount = 0;
        
        // Count matching records
        for (uint256 i = 0; i < allRecords.length; i++) {
            if (keccak256(bytes(allRecords[i].recordType)) == keccak256(bytes(_recordType)) && 
                allRecords[i].isActive) {
                matchingCount++;
            }
        }
        
        // Create array of matching records
        MedicalRecord[] memory matchingRecords = new MedicalRecord[](matchingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allRecords.length; i++) {
            if (keccak256(bytes(allRecords[i].recordType)) == keccak256(bytes(_recordType)) && 
                allRecords[i].isActive) {
                matchingRecords[currentIndex] = allRecords[i];
                currentIndex++;
            }
        }
        
        return matchingRecords;
    }
    
    /**
     * @dev Check if patient is registered
     * @param _patient Patient's address
     * @return Registration status
     */
    function isPatientRegistered(address _patient) external view returns (bool) {
        return registeredPatients[_patient];
    }
    
    /**
     * @dev Get total number of records for a patient
     * @param _patient Patient's address
     * @return Number of records
     */
    function getPatientRecordCount(address _patient) external view returns (uint256) {
        require(registeredPatients[_patient], "Patient not registered");
        return patientRecords[_patient].length;
    }
    
    /**
     * @dev Get system statistics
     * @return Total records, total patients
     */
    function getSystemStats() external view returns (uint256, uint256) {
        return (totalRecords, recordIdCounter - 1);
    }
}