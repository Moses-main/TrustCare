// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ProviderManagement
 * @dev Contract for managing healthcare providers
 */
contract ProviderManagement {
    address public owner;
    address public accessControlContract;
    
    struct Provider {
        address providerAddress;
        string name;
        string specialization;
        string licenseNumber;
        string hospitalAffiliation;
        string contactInfo;
        uint256 registrationTime;
        bool isActive;
        bool isVerified;
        uint256 reputation;
    }
    
    struct ProviderVerification {
        address verifier;
        uint256 verificationTime;
        string verificationNotes;
        bool isValid;
    }
    
    // Mappings
    mapping(address => Provider) public providers;
    mapping(address => bool) public registeredProviders;
    mapping(address => ProviderVerification) public providerVerifications;
    mapping(string => address) public licenseToProvider;
    mapping(string => address[]) public specializationProviders;
    
    // Arrays for enumeration
    address[] public allProviders;
    string[] public specializations;
    
    // Counters
    uint256 public totalProviders;
    uint256 public verifiedProviders;
    
    // Events
    event ProviderRegistered(address indexed provider, string name, string specialization, uint256 timestamp);
    event ProviderVerified(address indexed provider, address indexed verifier, uint256 timestamp);
    event ProviderDeactivated(address indexed provider, uint256 timestamp);
    event ProviderReactivated(address indexed provider, uint256 timestamp);
    event ProviderInfoUpdated(address indexed provider, uint256 timestamp);
    event ReputationUpdated(address indexed provider, uint256 newReputation, uint256 timestamp);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyRegisteredProvider() {
        require(registeredProviders[msg.sender], "Provider not registered");
        _;
    }
    
    modifier onlyActiveProvider(address _provider) {
        require(registeredProviders[_provider] && providers[_provider].isActive, "Provider not active");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || 
            msg.sender == accessControlContract ||
            registeredProviders[msg.sender],
            "Unauthorized access"
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Set access control contract address
     * @param _accessControl Address of the access control contract
     */
    function setAccessControl(address _accessControl) external onlyOwner {
        accessControlContract = _accessControl;
    }
    
    /**
     * @dev Register a new healthcare provider
     * @param _providerAddress Provider's wallet address
     * @param _name Provider's name
     * @param _specialization Provider's specialization
     * @param _licenseNumber Provider's license number
     * @param _hospitalAffiliation Hospital affiliation
     */
    function registerProvider(
        address _providerAddress,
        string memory _name,
        string memory _specialization,
        string memory _licenseNumber,
        string memory _hospitalAffiliation
    ) external onlyAuthorized {
        require(!registeredProviders[_providerAddress], "Provider already registered");
        require(_providerAddress != address(0), "Invalid provider address");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_specialization).length > 0, "Specialization cannot be empty");
        require(bytes(_licenseNumber).length > 0, "License number cannot be empty");
        require(licenseToProvider[_licenseNumber] == address(0), "License number already registered");
        
        providers[_providerAddress] = Provider({
            providerAddress: _providerAddress,
            name: _name,
            specialization: _specialization,
            licenseNumber: _licenseNumber,
            hospitalAffiliation: _hospitalAffiliation,
            contactInfo: "",
            registrationTime: block.timestamp,
            isActive: true,
            isVerified: false,
            reputation: 100 // Starting reputation
        });
        
        registeredProviders[_providerAddress] = true;
        licenseToProvider[_licenseNumber] = _providerAddress;
        allProviders.push(_providerAddress);
        totalProviders++;
        
        // Add to specialization mapping
        specializationProviders[_specialization].push(_providerAddress);
        
        // Add specialization to list if not exists
        bool specializationExists = false;
        for (uint256 i = 0; i < specializations.length; i++) {
            if (keccak256(bytes(specializations[i])) == keccak256(bytes(_specialization))) {
                specializationExists = true;
                break;
            }
        }
        if (!specializationExists) {
            specializations.push(_specialization);
        }
        
        emit ProviderRegistered(_providerAddress, _name, _specialization, block.timestamp);
    }
    
    /**
     * @dev Verify a healthcare provider
     * @param _provider Provider's address
     * @param _verificationNotes Notes about the verification
     */
    function verifyProvider(address _provider, string memory _verificationNotes) external onlyOwner {
        require(registeredProviders[_provider], "Provider not registered");
        require(!providers[_provider].isVerified, "Provider already verified");
        
        providers[_provider].isVerified = true;
        verifiedProviders++;
        
        providerVerifications[_provider] = ProviderVerification({
            verifier: msg.sender,
            verificationTime: block.timestamp,
            verificationNotes: _verificationNotes,
            isValid: true
        });
        
        emit ProviderVerified(_provider, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Update provider information
     * @param _name New name
     * @param _specialization New specialization
     * @param _hospitalAffiliation New hospital affiliation
     * @param _contactInfo New contact information
     */
    function updateProviderInfo(
        string memory _name,
        string memory _specialization,
        string memory _hospitalAffiliation,
        string memory _contactInfo
    ) external onlyRegisteredProvider {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_specialization).length > 0, "Specialization cannot be empty");
        
        Provider storage provider = providers[msg.sender];
        
        // Update specialization mapping if changed
        if (keccak256(bytes(provider.specialization)) != keccak256(bytes(_specialization))) {
            // Remove from old specialization
            address[] storage oldSpecProviders = specializationProviders[provider.specialization];
            for (uint256 i = 0; i < oldSpecProviders.length; i++) {
                if (oldSpecProviders[i] == msg.sender) {
                    oldSpecProviders[i] = oldSpecProviders[oldSpecProviders.length - 1];
                    oldSpecProviders.pop();
                    break;
                }
            }
            
            // Add to new specialization
            specializationProviders[_specialization].push(msg.sender);
            
            // Add specialization to list if not exists
            bool specializationExists = false;
            for (uint256 i = 0; i < specializations.length; i++) {
                if (keccak256(bytes(specializations[i])) == keccak256(bytes(_specialization))) {
                    specializationExists = true;
                    break;
                }
            }
            if (!specializationExists) {
                specializations.push(_specialization);
            }
        }
        
        provider.name = _name;
        provider.specialization = _specialization;
        provider.hospitalAffiliation = _hospitalAffiliation;
        provider.contactInfo = _contactInfo;
        
        emit ProviderInfoUpdated(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Deactivate a provider
     * @param _provider Provider's address
     */
    function deactivateProvider(address _provider) external onlyOwner {
        require(registeredProviders[_provider], "Provider not registered");
        require(providers[_provider].isActive, "Provider already deactivated");
        
        providers[_provider].isActive = false;
        
        emit ProviderDeactivated(_provider, block.timestamp);
    }
    
    /**
     * @dev Reactivate a provider
     * @param _provider Provider's address
     */
    function reactivateProvider(address _provider) external onlyOwner {
        require(registeredProviders[_provider], "Provider not registered");
        require(!providers[_provider].isActive, "Provider already active");
        
        providers[_provider].isActive = true;
        
        emit ProviderReactivated(_provider, block.timestamp);
    }
    
    /**
     * @dev Update provider reputation
     * @param _provider Provider's address
     * @param _newReputation New reputation score
     */
    function updateReputation(address _provider, uint256 _newReputation) external onlyOwner {
        require(registeredProviders[_provider], "Provider not registered");
        require(_newReputation <= 1000, "Reputation cannot exceed 1000");
        
        providers[_provider].reputation = _newReputation;
        
        emit ReputationUpdated(_provider, _newReputation, block.timestamp);
    }
    
    /**
     * @dev Get provider information
     * @param _provider Provider's address
     * @return Provider information
     */
    function getProviderInfo(address _provider) external view returns (Provider memory) {
        require(registeredProviders[_provider], "Provider not registered");
        return providers[_provider];
    }
    
    /**
     * @dev Get provider verification details
     * @param _provider Provider's address
     * @return Verification information
     */
    function getProviderVerification(address _provider) external view returns (ProviderVerification memory) {
        require(registeredProviders[_provider], "Provider not registered");
        return providerVerifications[_provider];
    }
    
    /**
     * @dev Get provider by license number
     * @param _licenseNumber License number
     * @return Provider's address
     */
    function getProviderByLicense(string memory _licenseNumber) external view returns (address) {
        return licenseToProvider[_licenseNumber];
    }
    
    /**
     * @dev Get providers by specialization
     * @param _specialization Specialization
     * @return Array of provider addresses
     */
    function getProvidersBySpecialization(string memory _specialization) external view returns (address[] memory) {
        return specializationProviders[_specialization];
    }
    
    /**
     * @dev Get all active providers by specialization
     * @param _specialization Specialization
     * @return Array of active provider addresses
     */
    function getActiveProvidersBySpecialization(string memory _specialization) external view returns (address[] memory) {
        address[] memory allSpecProviders = specializationProviders[_specialization];
        uint256 activeCount = 0;
        
        // Count active providers
        for (uint256 i = 0; i < allSpecProviders.length; i++) {
            if (providers[allSpecProviders[i]].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active providers
        address[] memory activeProviders = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allSpecProviders.length; i++) {
            if (providers[allSpecProviders[i]].isActive) {
                activeProviders[currentIndex] = allSpecProviders[i];
                currentIndex++;
            }
        }
        
        return activeProviders;
    }
    
    /**
     * @dev Get all verified providers
     * @return Array of verified provider addresses
     */
    function getVerifiedProviders() external view returns (address[] memory) {
        uint256 verifiedCount = 0;
        
        // Count verified providers
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isVerified) {
                verifiedCount++;
            }
        }
        
        // Create array of verified providers
        address[] memory verified = new address[](verifiedCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isVerified) {
                verified[currentIndex] = allProviders[i];
                currentIndex++;
            }
        }
        
        return verified;
    }
    
    /**
     * @dev Get all active providers
     * @return Array of active provider addresses
     */
    function getActiveProviders() external view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active providers
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active providers
        address[] memory activeProviders = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                activeProviders[currentIndex] = allProviders[i];
                currentIndex++;
            }
        }
        
        return activeProviders;
    }
    
    /**
     * @dev Get all specializations
     * @return Array of specializations
     */
    function getAllSpecializations() external view returns (string[] memory) {
        return specializations;
    }
    
    /**
     * @dev Get all provider addresses
     * @return Array of all provider addresses
     */
    function getAllProviders() external view returns (address[] memory) {
        return allProviders;
    }
    
    /**
     * @dev Check if provider is registered
     * @param _provider Provider's address
     * @return Registration status
     */
    function isProviderRegistered(address _provider) external view returns (bool) {
        return registeredProviders[_provider];
    }
    
    /**
     * @dev Check if provider is active
     * @param _provider Provider's address
     * @return Active status
     */
    function isProviderActive(address _provider) external view returns (bool) {
        return registeredProviders[_provider] && providers[_provider].isActive;
    }
    
    /**
     * @dev Check if provider is verified
     * @param _provider Provider's address
     * @return Verification status
     */
    function isProviderVerified(address _provider) external view returns (bool) {
        return registeredProviders[_provider] && providers[_provider].isVerified;
    }
    
    /**
     * @dev Search providers by name
     * @param _searchTerm Search term
     * @return Array of matching provider addresses
     */
    function searchProvidersByName(string memory _searchTerm) external view returns (address[] memory) {
        uint256 matchingCount = 0;
        bytes32 searchHash = keccak256(bytes(_searchTerm));
        
        // Count matching providers
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                bytes32 nameHash = keccak256(bytes(providers[allProviders[i]].name));
                if (nameHash == searchHash) {
                    matchingCount++;
                }
            }
        }
        
        // Create array of matching providers
        address[] memory matchingProviders = new address[](matchingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                bytes32 nameHash = keccak256(bytes(providers[allProviders[i]].name));
                if (nameHash == searchHash) {
                    matchingProviders[currentIndex] = allProviders[i];
                    currentIndex++;
                }
            }
        }
        
        return matchingProviders;
    }
    
    /**
     * @dev Get top providers by reputation
     * @param _limit Number of providers to return
     * @return Array of top provider addresses
     */
    function getTopProviders(uint256 _limit) external view returns (address[] memory) {
        require(_limit > 0, "Limit must be greater than 0");
        
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                activeCount++;
            }
        }
        
        uint256 returnCount = _limit > activeCount ? activeCount : _limit;
        address[] memory topProviders = new address[](returnCount);
        uint256[] memory topReputations = new uint256[](returnCount);
        
        // Simple sorting - find top providers by reputation
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                uint256 reputation = providers[allProviders[i]].reputation;
                
                // Find insertion position
                for (uint256 j = 0; j < returnCount; j++) {
                    if (j >= topProviders.length || topProviders[j] == address(0) || reputation > topReputations[j]) {
                        // Shift elements
                        for (uint256 k = returnCount - 1; k > j; k--) {
                            if (k > 0) {
                                topProviders[k] = topProviders[k - 1];
                                topReputations[k] = topReputations[k - 1];
                            }
                        }
                        
                        topProviders[j] = allProviders[i];
                        topReputations[j] = reputation;
                        break;
                    }
                }
            }
        }
        
        return topProviders;
    }
    
    /**
     * @dev Get system statistics
     * @return Total providers, verified providers, active providers
     */
    function getSystemStats() external view returns (uint256, uint256, uint256) {
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < allProviders.length; i++) {
            if (providers[allProviders[i]].isActive) {
                activeCount++;
            }
        }
        
        return (totalProviders, verifiedProviders, activeCount);
    }
}