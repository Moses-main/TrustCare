# TrustCare - Decentralized Healthcare Records System

A blockchain-based decentralized healthcare records system that encompasses patient data storage, access control mechanisms, and user interfaces for both patients and healthcare providers.

![TrustCare Logo](https://via.placeholder.com/150x50?text=TrustCare)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Smart Contracts](#smart-contracts)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

TrustCare is a decentralized healthcare records management system that leverages blockchain technology to provide secure, immutable, and patient-controlled medical records. The system enables patients to have full control over their medical data while allowing healthcare providers to access records with proper authorization.

### Key Benefits

- **Patient Control**: Patients own and control access to their medical records
- **Security**: Blockchain-based access control with cryptographic security
- **Immutability**: Medical records are stored with IPFS and referenced on-chain
- **Interoperability**: Standard APIs for healthcare data exchange
- **Real-time Access**: Instant access to records with proper authorization

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TRUSTCARE SYSTEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐         ┌─────────────────┐                         │
│  │    Frontend      │         │     Backend      │                         │
│  │    (React)       │◄───────►│    (Express)    │                         │
│  │                  │  REST   │                  │                         │
│  │  - Patient UI    │   API   │  - REST API     │                         │
│  │  - Provider UI   │         │  - Auth         │                         │
│  │  - Dashboard     │         │  - Routes       │                         │
│  │  - Records       │         │  - Controllers  │                         │
│  └────────┬────────┘         └────────┬────────┘                         │
│           │                            │                                    │
│           │                            │                                    │
│           ▼                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │                      PRIVY AUTHENTICATION                         │      │
│  │  - Email Login                                                   │      │
│  │  - Wallet Connection                                            │      │
│  └──────────────────────────────────────────────────────────────────┘      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                              DATA LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │   MongoDB       │    │   IPFS/Pinata  │    │   Blockchain    │      │
│  │   (Database)    │    │   (Storage)    │    │   (Ethereum)   │      │
│  │                 │    │                 │    │                 │      │
│  │  - Users        │    │  - Medical     │    │  - Access      │      │
│  │  - Patients     │    │    Records     │    │    Control     │      │
│  │  - Providers    │    │  - Documents   │    │  - Contracts   │      │
│  │  - Appointments │    │  - Files       │    │  - Patient     │      │
│  │  - Medical      │    │                 │    │    Registry    │      │
│  │    Records      │    │                 │    │  - Provider    │      │
│  └─────────────────┘    └─────────────────┘    │    Registry    │      │
│                                                  └─────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER AUTHENTICATION FLOW                            │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────────┐     ┌─────────────────┐
  │  User    │────►│   Navbar     │────►│  Privy Modal    │
  │  Clicks  │     │  "Sign In"   │     │  (Auth Screen)  │
  └──────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                    ┌───────────────────────────────┼───────────────────────┐
                    │                               │                       │
                    ▼                               ▼                       ▼
          ┌─────────────────┐          ┌─────────────────┐      ┌─────────────────┐
          │   Email Login   │          │  Wallet Login  │      │  OAuth (Future) │
          └────────┬────────┘          └────────┬────────┘      └────────┬────────┘
                   │                            │                       │
                   └────────────────────────────┴───────────────────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │   Auth Context  │
                              │   (User State)  │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │  Redirect to     │
                              │  Dashboard       │
                              │  (Patient/       │
                              │   Provider)      │
                              └──────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                         MEDICAL RECORD ACCESS FLOW                          │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────────┐     ┌─────────────────┐
  │ Provider │────►│  Request     │────►│  Verify Access  │
  │ Views    │     │  Patient     │     │  (Blockchain)   │
  │ Records  │     │  Records     │     │                 │
  └──────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                                    ┌──────────────┴──────────────┐
                                    │                             │
                                    ▼                             ▼
                          ┌─────────────────┐           ┌─────────────────┐
                          │   Access       │           │   Access       │
                          │   Granted      │           │   Denied       │
                          └────────┬────────┘           └────────┬────────┘
                                   │                             │
                                   ▼                             ▼
                          ┌─────────────────┐           ┌─────────────────┐
                          │  Fetch from     │           │  Show Error     │
                          │  IPFS/MongoDB   │           │  Message        │
                          └────────┬────────┘           └─────────────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │  Display        │
                          │  Records to     │
                          │  Provider       │
                          └─────────────────┘
```

---

## Technology Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Privy** - Authentication (Email & Wallet)
- **Chart.js / React-Chartjs-2** - Data visualization
- **Formik + Yup** - Form handling and validation
- **React Toastify** - Notifications
- **Viem** - Ethereum interaction

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JSON Web Token (JWT)** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - HTTP security headers
- **Express Rate Limit** - Rate limiting
- **Socket.io** - Real-time communication

### Blockchain & Storage
- **Solidity** - Smart contract language
- **Foundry** - Smart contract development framework
- **IPFS** - Decentralized file storage
- **Pinata** - IPFS pinning service
- **Web3.js / Viem** - Blockchain interaction

---

## Features

### Authentication & Authorization
- Email-based authentication via Privy
- Crypto wallet connection (MetaMask, etc.)
- Role-based access control (Patient, Provider, Admin)
- JWT-based session management

### Patient Features
- View personal health dashboard
- Access medical records
- Manage appointments
- View health metrics
- Track medications
- Grant/revoke access to providers

### Provider Features
- Patient management
- View patient records (with permission)
- Manage appointments
- Add medical records
- Access patient history

### Blockchain Features
- Immutable access control logging
- Patient registry on-chain
- Provider registry on-chain
- Time-limited access permissions
- Emergency access (admin only)

### Data Storage
- IPFS for file storage
- Pinata for IPFS pinning
- MongoDB for structured data
- Encrypted sensitive data

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Moses-main/TrustCare.git
cd TrustCare
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
```

4. **Configure environment variables**

Create `backend/.env`:
```env
NODE_ENV=development
PORT=4500
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d
MONGO_URI=mongodb://localhost:27017/trustcare
FRONTEND_URL=http://localhost:5173
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
IPFS_PROTOCOL=https
WEB3_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=0xYourContractAddress
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
CORS_ORIGIN=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:4500/api
VITE_APP_NAME=TrustCare
VITE_PRIVY_APP_ID=your_privy_app_id_here
```

5. **Start MongoDB**
```bash
# For local MongoDB
mongod --dbpath /data/db

# Or use MongoDB Atlas cloud
# Update MONGO_URI in backend/.env
```

6. **Start the backend**
```bash
cd backend
npm run dev
```

7. **Start the frontend**
```bash
cd frontend
npm run dev
```

8. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4500/api

### Running Smart Contracts (Optional)

1. **Install Foundry**
```bash
cd smart-contracts
forge install
```

2. **Compile contracts**
```bash
forge build
```

3. **Deploy to local network**
```bash
forge script Deploy --rpc-url http://localhost:8545 --broadcast
```

---

## Project Structure

```
TrustCare/
├── backend/                    # Express.js backend API
│   ├── config/                # Configuration files
│   │   └── config.js         # Environment config
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   ├── recordController.js
│   │   ├── appointmentController.js
│   │   └── userController.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── socketInjector.js
│   ├── models/                # MongoDB models
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Provider.js
│   │   ├── MedicalRecord.js
│   │   └── Appointment.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── records.js
│   │   ├── appointments.js
│   │   ├── providers.js
│   │   ├── users.js
│   │   └── blockchain.js
│   ├── services/              # Business logic
│   │   ├── ipfsService.js
│   │   ├── pinataService.js
│   │   └── blockchainService.js
│   ├── utils/                 # Utilities
│   │   ├── email.js
│   │   └── generateToken.js
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server-fixed.js        # Main server file
│
├── frontend/                   # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Layout/
│   │   │   │   └── Navbar.jsx
│   │   │   ├── auth/
│   │   │   ├── doctors/
│   │   │   └── ...
│   │   ├── contexts/          # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useWeb3.js
│   │   │   └── useContract.js
│   │   ├── layouts/           # Page layouts
│   │   ├── pages/             # Page components
│   │   │   ├── Auth/
│   │   │   ├── Patient/
│   │   │   ├── Provider/
│   │   │   ├── Landing/
│   │   │   └── Info/
│   │   ├── services/          # API services
│   │   │   ├── api.js
│   │   │   ├── blockchain.js
│   │   │   └── accessControlService.js
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                   # Environment variables
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── smart-contracts/            # Solidity smart contracts
│   ├── src/
│   │   ├── HealthcareRecords.sol
│   │   ├── AccessControl.sol
│   │   ├── PatientRecords.sol
│   │   └── ProviderManagement.sol
│   ├── script/
│   ├── test/
│   ├── foundry.toml
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  email: String,             // Required, Unique
  walletAddress: String,     // Required, Unique
  role: String,              // Enum: ['patient', 'provider', 'admin']
  password: String,          // Required, Hashed
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  isEmailVerified: Boolean,  // Default: false
  lastLogin: Date,
  loginAttempts: Number,
  accountLocked: Boolean,
  accountLockedUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Patient Collection

```javascript
{
  _id: ObjectId,
  walletAddress: String,     // Required, Unique
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  allergies: [String],
  medications: [{
    name: String,
    dosage: String,
    frequency: String
  }],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Provider Collection

```javascript
{
  _id: ObjectId,
  walletAddress: String,     // Required, Unique
  name: String,
  specialization: String,
  licenseNumber: String,
  hospitalAffiliation: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### MedicalRecord Collection

```javascript
{
  _id: ObjectId,
  patientId: ObjectId,        // Reference to Patient
  providerId: ObjectId,       // Reference to Provider
  recordType: String,
  description: String,
  ipfsHash: String,           // IPFS hash of the document
  diagnosis: String,
  treatment: String,
  attachments: [{
    name: String,
    ipfsHash: String,
    mimeType: String
  }],
  accessLog: [{
    providerId: ObjectId,
    accessTime: Date,
    action: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Collection

```javascript
{
  _id: ObjectId,
  patientId: ObjectId,        // Reference to Patient
  providerId: ObjectId,       // Reference to Provider
  date: Date,
  time: String,
  status: String,             // Enum: ['scheduled', 'completed', 'cancelled']
  type: String,              // Checkup, Follow-up, Emergency, etc.
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE SCHEMA DIAGRAM                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│       User          │         │      Patient        │
├─────────────────────┤         ├─────────────────────┤
│ _id (PK)           │◄────────│ walletAddress (FK) │
│ name               │         │ _id (PK)            │
│ email              │         │ fullName            │
│ walletAddress (UK) │         │ dateOfBirth         │
│ role               │         │ gender              │
│ password           │         │ contactInfo         │
│ isEmailVerified    │         │ allergies[]        │
│ lastLogin          │         │ medications[]       │
│ createdAt          │         │ emergencyContact    │
└─────────────────────┘         │ createdAt          │
         │                      └─────────────────────┘
         │                              │
         │                              │
         ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MEDICAL RECORD                           │
├─────────────────────────────────────────────────────────────┤
│ _id (PK)                                                  │
│ patientId (FK) ────────────► Patient._id                  │
│ providerId (FK) ───────────► Provider._id                  │
│ recordType                                              │
│ description                                             │
│ ipfsHash                                                │
│ diagnosis                                               │
│ treatment                                               │
│ attachments[]                                           │
│ accessLog[]                                             │
│ createdAt                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────┐         ┌─────────────────────┐
│     Provider        │         │    Appointment      │
├─────────────────────┤         ├─────────────────────┤
│ _id (PK)           │◄────────│ _id (PK)           │
│ walletAddress (UK) │         │ patientId (FK)     │
│ name               │         │ providerId (FK)    │
│ specialization     │         │ date               │
│ licenseNumber      │         │ time               │
│ hospitalAffiliation│         │ status             │
│ contactInfo        │         │ type               │
│ isVerified         │         │ notes              │
│ createdAt          │         │ createdAt          │
└─────────────────────┘         └─────────────────────┘
```

---

## Smart Contracts

### HealthcareRecords.sol
Main contract that orchestrates the decentralized healthcare records system.

**Key Functions:**
- `registerPatient()` - Register a new patient
- `registerProvider()` - Register a new healthcare provider
- `addMedicalRecord()` - Add a medical record
- `grantAccess()` - Grant access to a provider
- `revokeAccess()` - Revoke access from a provider
- `accessPatientRecords()` - Access patient records (provider only)

### AccessControl.sol
Manages access permissions between patients and providers.

### PatientRecords.sol
Stores patient information and medical records on-chain.

### ProviderManagement.sol
Manages healthcare provider registration and verification.

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/me` | Get current user |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| POST | `/api/v1/auth/reset-password/:token` | Reset password |
| PUT | `/api/v1/auth/update-password` | Update password |

### Patient Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/patients` | Get all patients |
| GET | `/api/v1/patients/:id` | Get patient by ID |
| PUT | `/api/v1/patients/:id` | Update patient |
| DELETE | `/api/v1/patients/:id` | Delete patient |

### Provider Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/providers` | Get all providers |
| GET | `/api/v1/providers/:id` | Get provider by ID |
| POST | `/api/v1/providers` | Create provider |
| PUT | `/api/v1/providers/:id` | Update provider |

### Medical Records Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/records` | Get all records |
| GET | `/api/v1/records/:id` | Get record by ID |
| POST | `/api/v1/records` | Create record |
| PUT | `/api/v1/records/:id` | Update record |
| DELETE | `/api/v1/records/:id` | Delete record |

### Appointment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/appointments` | Get all appointments |
| GET | `/api/v1/appointments/:id` | Get appointment by ID |
| POST | `/api/v1/appointments` | Create appointment |
| PUT | `/api/v1/appointments/:id` | Update appointment |
| DELETE | `/api/v1/appointments/:id` | Delete appointment |

---

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 4500 |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration | 30d |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/trustcare |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |
| IPFS_HOST | IPFS host | ipfs.infura.io |
| IPFS_PORT | IPFS port | 5001 |
| IPFS_PROTOCOL | IPFS protocol | https |
| WEB3_PROVIDER | Web3 provider URL | http://localhost:8545 |
| CONTRACT_ADDRESS | Smart contract address | - |
| CORS_ORIGIN | CORS allowed origin | http://localhost:5173 |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:4500/api |
| VITE_APP_NAME | Application name | TrustCare |
| VITE_PRIVY_APP_ID | Privy app ID | - |

---

## Security

### Authentication
- JWT-based authentication with secure token generation
- Privy integration for secure email and wallet authentication
- Password hashing with bcrypt (12 rounds)
- Rate limiting to prevent brute force attacks

### Data Protection
- HTTPS enforcement in production
- Helmet.js for security headers
- CORS configuration for controlled access
- Input validation and sanitization

### Blockchain Security
- Access control through smart contracts
- Time-limited permissions
- Immutable audit trail
- Emergency access controls (owner only)

---

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env
   - Verify network connectivity

2. **Privy Authentication Not Working**
   - Verify VITE_PRIVY_APP_ID is set
   - Check Privy dashboard configuration
   - Ensure correct redirect URIs

3. **IPFS Upload Fails**
   - Check IPFS_HOST and IPFS_PORT
   - Verify Pinata API keys (if using)
   - Check network connection

4. **Smart Contract Issues**
   - Ensure local blockchain is running
   - Verify CONTRACT_ADDRESS
   - Check network configuration

### Getting Help

- Open an issue on GitHub
- Check existing issues
- Review documentation

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

---

## Support

For support inquiries, please open an issue on GitHub or contact the maintainers.

---

## Acknowledgments

- React Team
- MongoDB
- Ethereum Community
- IPFS
- Privy
- All contributors
