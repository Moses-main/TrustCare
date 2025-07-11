## ✅ Paient API Documentation

This API documentation follows a **RESTful structure** and is designed for use in tools like **Postman**, **Swagger**, or internal dev guides.

---

## 🔗 Base URL

```

[https://dhrs.onrender.com/api/auth](https://dhrs.onrender.com/api/auth)

```

### 🔐 Authentication Required

All endpoints below require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### 📘 API Group: Patient

---

#### 🔹 `POST baseUrl/api/auth/signup`

**Create a new patient user**

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678",
  "role": "patient",
  "walletAddress": "0xabc123def456"
}
```

**Success Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "walletAddress": "0xabc123def456",
    "role": "patient"
  }
}
```

---

#### 🔹 `POST baseUrl/api/auth/login`

**Authenticate and get access token**

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

**Success Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": { ... }
}
```

---

#### 🔹 `GET baseUrl/api/patients/profile`

**Fetch the patient’s profile data**

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response:**

```json
{
  "_id": "...",
  "walletAddress": "0xabc123def456",
  "fullName": "John Doe",
  "contactInfo": { ... },
  ...
}
```

---

#### 🔹 `PUT baseUrl/api/patients/profile`

**Update the patient’s profile**

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body Example:**

```json
{
  "fullName": "John D. Doe",
  "dateOfBirth": "1990-05-10",
  "gender": "male",
  "contactInfo": {
    "phone": "08123456789",
    "email": "john@example.com",
    "address": "14 Nwadinobi Crescent, BCA Road"
  },
  "allergies": ["Penicillin"],
  "medications": [
    { "name": "Ibuprofen", "dosage": "200mg", "frequency": "Once a day" }
  ],
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone": "08012345678"
  }
}
```

**Success Response:**

```json
{
  "message": "Patient profile updated successfully",
  "patient": { ... }
}
```

---

#### 🔹 `POST baseUrl/api/patients/grant-access`

**Grant a provider access to your records**

**Request Body:**

```json
{
  "providerWallet": "0xprovider987abc",
  "duration": 3600,
  "canRead": true,
  "canWrite": false
}
```

**Success Response:**

```json
{
  "success": true,
  "transactionHash": "0xabc456..."
}
```

---

#### 🔹 `GET baseUrl/api/patients/permissions`

**Get access permission records (mocked)**

**Success Response:**

```json
{
  "permissions": []
}
```
