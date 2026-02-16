// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AccessControl
 * @dev Contract for managing access permissions between patients and healthcare providers
 */
contract AccessControl {
    address public owner;
    address public patientRecordsContract;
    address public providerManagementContract;
    
    // Permission levels
    uint256 public constant READ_BASIC = 1;      // 001
    uint256 public constant READ_DETAILED = 2;   // 010
    uint256 public constant WRITE_RECORDS = 4;   // 100
    uint256 public constant FULL_ACCESS = 7;     // 111
    
    struct AccessPermission {
        address patient;
        address provider;
        uint256 permissions;
        uint256 grantedTime;
        uint256 expiryTime;
        bool isActive;
        string purpose;
    }
    
    // Mappings
    mapping(address => mapping(address => AccessPermission)) public accessPermissions;
    mapping(address => address[]) public patientProviders;
    mapping(address => address[]) public providerPatients;
    mapping(address => mapping(address => bool)) public hasActiveAccess;
    
    // Access logs
    struct AccessLog {
        address patient;
        address provider;
        uint256 timestamp;
        string action;
        uint256 recordId;
    }
    
    AccessLog[] public accessLogs;
    mapping(address => AccessLog[]) public patientAccessLogs;
    mapping(address => AccessLog[]) public providerAccessLogs;
    
    // Events
    event AccessGranted(
        address indexed patient, 
        address indexed provider, 
        uint256 permissions, 
        uint256 expiryTime, 
        uint256 timestamp
    );
    event AccessRevoked(address indexed patient, address indexed provider, uint256 timestamp);
    event AccessUsed(address indexed patient, address indexed provider, string action, uint256 timestamp);
    event AccessExpired(address indexed patient, address indexed provider, uint256 timestamp);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || 
            msg.sender == patientRecordsContract ||
            msg.sender == providerManagementContract,
            "Unauthorized access"
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Set contract addresses
     * @param _patientRecords Address of patient records contract
     */
    function setPatientRecords(address _patientRecords) external onlyOwner {
        patientRecordsContract = _patientRecords;
    }
    
    /**
     * @dev Set provider management contract address
     * @param _providerManagement Address of provider management contract
     */
    function setProviderManagement(address _providerManagement) external onlyOwner {
        providerManagementContract = _providerManagement;
    }
    
    /**
     * @dev Grant access to a healthcare provider
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _permissions Permission level
     * @param _expiryTime Expiry timestamp
     */
    function grantAccess(
        address _patient,
        address _provider,
        uint256 _permissions,
        uint256 _expiryTime
    ) external {
        require(
            msg.sender == _patient || 
            msg.sender == owner ||
            msg.sender == patientRecordsContract,
            "Only patient"
        );
        require(_patient != address(0), "Invalid patient address");
        require(_provider != address(0), "Invalid provider address");
        require(_expiryTime > block.timestamp, "Expiry time must be in the future");
        require(_permissions > 0 && _permissions <= FULL_ACCESS, "Invalid permissions");
        
        // Check if access already exists
        if (hasActiveAccess[_patient][_provider]) {
            // Update existing access
            accessPermissions[_patient][_provider].permissions = _permissions;
            accessPermissions[_patient][_provider].expiryTime = _expiryTime;
        } else {
            // Create new access
            accessPermissions[_patient][_provider] = AccessPermission({
                patient: _patient,
                provider: _provider,
                permissions: _permissions,
                grantedTime: block.timestamp,
                expiryTime: _expiryTime,
                isActive: true,
                purpose: "Medical consultation"
            });
            
            patientProviders[_patient].push(_provider);
            providerPatients[_provider].push(_patient);
            hasActiveAccess[_patient][_provider] = true;
        }
        
        emit AccessGranted(_patient, _provider, _permissions, _expiryTime, block.timestamp);
    }
    
    /**
     * @dev Grant access with purpose
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _permissions Permission level
     * @param _expiryTime Expiry timestamp
     * @param _purpose Purpose of access
     */
    function grantAccessWithPurpose(
        address _patient,
        address _provider,
        uint256 _permissions,
        uint256 _expiryTime,
        string memory _purpose
    ) external {
        require(
            msg.sender == _patient || 
            msg.sender == owner ||
            msg.sender == patientRecordsContract,
            "Only patient or authorized contracts can grant access"
        );
        require(_patient != address(0), "Invalid patient address");
        require(_provider != address(0), "Invalid provider address");
        require(_expiryTime > block.timestamp, "Expiry time must be in the future");
        require(_permissions > 0 && _permissions <= FULL_ACCESS, "Invalid permissions");
        
        accessPermissions[_patient][_provider] = AccessPermission({
            patient: _patient,
            provider: _provider,
            permissions: _permissions,
            grantedTime: block.timestamp,
            expiryTime: _expiryTime,
            isActive: true,
            purpose: _purpose
        });
        
        if (!hasActiveAccess[_patient][_provider]) {
            patientProviders[_patient].push(_provider);
            providerPatients[_provider].push(_patient);
            hasActiveAccess[_patient][_provider] = true;
        }
        
        emit AccessGranted(_patient, _provider, _permissions, _expiryTime, block.timestamp);
    }
    
    /**
     * @dev Revoke access from a provider
     * @param _patient Patient's address
     * @param _provider Provider's address
     */
    function revokeAccess(address _patient, address _provider) external {
        require(
            msg.sender == _patient || 
            msg.sender == owner ||
            msg.sender == patientRecordsContract,
            "Only patient or authorized contracts can revoke access"
        );
        require(hasActiveAccess[_patient][_provider], "No active access found");
        
        accessPermissions[_patient][_provider].isActive = false;
        accessPermissions[_patient][_provider].expiryTime = block.timestamp;
        hasActiveAccess[_patient][_provider] = false;
        
        emit AccessRevoked(_patient, _provider, block.timestamp);
    }
    
    /**
     * @dev Check if provider has access to patient data
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @return Boolean indicating access status
     */
    function hasAccess(address _patient, address _provider) external view returns (bool) {
        if (!hasActiveAccess[_patient][_provider]) {
            return false;
        }
        
        AccessPermission memory permission = accessPermissions[_patient][_provider];
        
        if (!permission.isActive) {
            return false;
        }
        
        if (permission.expiryTime <= block.timestamp) {
            return false;
        }
        
        return true;
    }
    
    /**
     * @dev Check if provider has specific permission
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _permissionLevel Permission level to check
     * @return Boolean indicating permission status
     */
    function hasPermission(address _patient, address _provider, uint256 _permissionLevel) external view returns (bool) {
        if (!hasActiveAccess[_patient][_provider]) {
            return false;
        }
        
        AccessPermission memory permission = accessPermissions[_patient][_provider];
        
        if (!permission.isActive || permission.expiryTime <= block.timestamp) {
            return false;
        }
        
        return (permission.permissions & _permissionLevel) == _permissionLevel;
    }
    
    /**
     * @dev Log access usage
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _action Action performed
     * @param _recordId Record ID accessed (0 if not applicable)
     */
    function logAccess(address _patient, address _provider, string memory _action, uint256 _recordId) external {
        require(
            msg.sender == patientRecordsContract ||
            msg.sender == providerManagementContract ||
            msg.sender == owner,
            "Only authorized"
        );
        
        AccessLog memory newLog = AccessLog({
            patient: _patient,
            provider: _provider,
            timestamp: block.timestamp,
            action: _action,
            recordId: _recordId
        });
        
        accessLogs.push(newLog);
        patientAccessLogs[_patient].push(newLog);
        providerAccessLogs[_provider].push(newLog);
        
        emit AccessUsed(_patient, _provider, _action, block.timestamp);
    }
    
    /**
     * @dev Get access permissions for a patient-provider pair
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @return Access permission details
     */
    function getAccessPermissions(address _patient, address _provider) external view returns (AccessPermission memory) {
        return accessPermissions[_patient][_provider];
    }
    
    /**
     * @dev Get all providers with access to a patient
     * @param _patient Patient's address
     * @return Array of provider addresses
     */
    function getPatientProviders(address _patient) external view returns (address[] memory) {
        return patientProviders[_patient];
    }
    
    /**
     * @dev Get all patients a provider has access to
     * @param _provider Provider's address
     * @return Array of patient addresses
     */
    function getProviderPatients(address _provider) external view returns (address[] memory) {
        return providerPatients[_provider];
    }
    
    /**
     * @dev Get active providers for a patient
     * @param _patient Patient's address
     * @return Array of active provider addresses
     */
    function getActiveProviders(address _patient) external view returns (address[] memory) {
        address[] memory allProviders = patientProviders[_patient];
        uint256 activeCount = 0;
        
        // Count active providers
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (hasActiveAccess[_patient][allProviders[i]]) {
                AccessPermission memory permission = accessPermissions[_patient][allProviders[i]];
                if (permission.isActive && permission.expiryTime > block.timestamp) {
                    activeCount++;
                }
            }
        }
        
        // Create array of active providers
        address[] memory activeProviders = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (hasActiveAccess[_patient][allProviders[i]]) {
                AccessPermission memory permission = accessPermissions[_patient][allProviders[i]];
                if (permission.isActive && permission.expiryTime > block.timestamp) {
                    activeProviders[currentIndex] = allProviders[i];
                    currentIndex++;
                }
            }
        }
        
        return activeProviders;
    }
    
    /**
     * @dev Get access logs for a patient
     * @param _patient Patient's address
     * @return Array of access logs
     */
    function getPatientAccessLogs(address _patient) external view returns (AccessLog[] memory) {
        return patientAccessLogs[_patient];
    }
    
    /**
     * @dev Get access logs for a provider
     * @param _provider Provider's address
     * @return Array of access logs
     */
    function getProviderAccessLogs(address _provider) external view returns (AccessLog[] memory) {
        return providerAccessLogs[_provider];
    }
    
    /**
     * @dev Get recent access logs
     * @param _limit Number of logs to return
     * @return Array of recent access logs
     */
    function getRecentAccessLogs(uint256 _limit) external view returns (AccessLog[] memory) {
        require(_limit > 0, "Limit must be greater than 0");
        
        uint256 totalLogs = accessLogs.length;
        uint256 returnCount = _limit > totalLogs ? totalLogs : _limit;
        
        AccessLog[] memory recentLogs = new AccessLog[](returnCount);
        
        for (uint256 i = 0; i < returnCount; i++) {
            recentLogs[i] = accessLogs[totalLogs - 1 - i];
        }
        
        return recentLogs;
    }
    
    /**
     * @dev Clean up expired access permissions
     * @param _patient Patient's address
     * @param _provider Provider's address
     */
    function cleanupExpiredAccess(address _patient, address _provider) external {
        require(hasActiveAccess[_patient][_provider], "No active access found");
        
        AccessPermission storage permission = accessPermissions[_patient][_provider];
        
        if (permission.expiryTime <= block.timestamp && permission.isActive) {
            permission.isActive = false;
            hasActiveAccess[_patient][_provider] = false;
            
            emit AccessExpired(_patient, _provider, block.timestamp);
        }
    }
    
    /**
     * @dev Bulk cleanup expired access permissions
     * @param _patients Array of patient addresses
     * @param _providers Array of provider addresses
     */
    function bulkCleanupExpiredAccess(address[] memory _patients, address[] memory _providers) external {
        require(_patients.length == _providers.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < _patients.length; i++) {
            if (hasActiveAccess[_patients[i]][_providers[i]]) {
                AccessPermission storage permission = accessPermissions[_patients[i]][_providers[i]];
                
                if (permission.expiryTime <= block.timestamp && permission.isActive) {
                    permission.isActive = false;
                    hasActiveAccess[_patients[i]][_providers[i]] = false;
                    
                    emit AccessExpired(_patients[i], _providers[i], block.timestamp);
                }
            }
        }
    }
    
    /**
     * @dev Emergency revoke all access for a patient
     * @param _patient Patient's address
     */
    function emergencyRevokeAll(address _patient) external {
        require(msg.sender == _patient || msg.sender == owner, "Unauthorized");
        
        address[] memory providers = patientProviders[_patient];
        
        for (uint256 i = 0; i < providers.length; i++) {
            if (hasActiveAccess[_patient][providers[i]]) {
                accessPermissions[_patient][providers[i]].isActive = false;
                accessPermissions[_patient][providers[i]].expiryTime = block.timestamp;
                hasActiveAccess[_patient][providers[i]] = false;
                
                emit AccessRevoked(_patient, providers[i], block.timestamp);
            }
        }
    }
    
    /**
     * @dev Get system statistics
     * @return Total access permissions, total access logs
     */
    function getSystemStats() external view returns (uint256, uint256) {
        return (0, accessLogs.length); // Note: We can't easily count total permissions due to mapping limitations
    }
    
    /**
     * @dev Check if access is about to expire
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _warningTime Warning time in seconds
     * @return Boolean indicating if access is about to expire
     */
    function isAccessExpiringSoon(address _patient, address _provider, uint256 _warningTime) external view returns (bool) {
        if (!hasActiveAccess[_patient][_provider]) {
            return false;
        }
        
        AccessPermission memory permission = accessPermissions[_patient][_provider];
        
        if (!permission.isActive) {
            return false;
        }
        
        return (permission.expiryTime - block.timestamp) <= _warningTime;
    }
    
    /**
     * @dev Extend access expiry time
     * @param _patient Patient's address
     * @param _provider Provider's address
     * @param _newExpiryTime New expiry timestamp
     */
    function extendAccess(address _patient, address _provider, uint256 _newExpiryTime) external {
        require(
            msg.sender == _patient || 
            msg.sender == owner,
            "Only patient or owner can extend access"
        );
        require(hasActiveAccess[_patient][_provider], "No active access found");
        require(_newExpiryTime > block.timestamp, "New expiry time must be in the future");
        
        AccessPermission storage permission = accessPermissions[_patient][_provider];
        require(permission.isActive, "Access is not active");
        
        permission.expiryTime = _newExpiryTime;
        
        emit AccessGranted(_patient, _provider, permission.permissions, _newExpiryTime, block.timestamp);
    }
}