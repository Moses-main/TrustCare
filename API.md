# API Documentation

## Base URL
```
Development: http://localhost:4500/api
Production: https://your-domain.com/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /v1/auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient",
  "walletAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Login
```
POST /v1/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Get Current User
```
GET /v1/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

## Patient Endpoints

### Get All Patients
```
GET /v1/patients
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "patients": [...]
}
```

### Get Patient by ID
```
GET /v1/patients/:id
```

**Response:**
```json
{
  "success": true,
  "patient": {
    "_id": "...",
    "walletAddress": "0x...",
    "fullName": "John Doe",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "contactInfo": {
      "phone": "...",
      "email": "...",
      "address": "..."
    },
    "allergies": ["Penicillin"],
    "medications": [...]
  }
}
```

### Update Patient
```
PUT /v1/patients/:id
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "contactInfo": {
    "phone": "+1234567890",
    "address": "123 Main St"
  }
}
```

---

## Provider Endpoints

### Get All Providers
```
GET /v1/providers
```

**Response:**
```json
{
  "success": true,
  "providers": [...]
}
```

### Get Provider by ID
```
GET /v1/providers/:id
```

---

## Medical Records Endpoints

### Get All Records
```
GET /v1/records
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get Record by ID
```
GET /v1/records/:id
```

### Create Record
```
POST /v1/records
```

**Request Body:**
```json
{
  "patientId": "...",
  "recordType": "diagnosis",
  "description": "Annual checkup",
  "diagnosis": "Healthy",
  "treatment": "None",
  "ipfsHash": "Qm..."
}
```

### Update Record
```
PUT /v1/records/:id
```

### Delete Record
```
DELETE /v1/records/:id
```

---

## Appointment Endpoints

### Get All Appointments
```
GET /v1/appointments
```

### Get Appointment by ID
```
GET /v1/appointments/:id
```

### Create Appointment
```
POST /v1/appointments
```

**Request Body:**
```json
{
  "patientId": "...",
  "providerId": "...",
  "date": "2024-12-25",
  "time": "10:00",
  "type": "checkup",
  "notes": "Regular checkup"
}
```

### Update Appointment
```
PUT /v1/appointments/:id
```

### Cancel Appointment
```
DELETE /v1/appointments/:id
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
