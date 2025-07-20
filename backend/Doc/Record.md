# 🏥 Medical Record Controller API

This API allows healthcare providers to create, access, and download patient medical records stored securely using IPFS and blockchain.

---

## 📘 Base URL

```
[https://dhrs.onrender.com/api/auth](https://dhrs.onrender.com/api/auth)
```

---

## 📤 1. Create Medical Record

**Endpoint:**
`POST baseUrl/api/records/create`

**Description:**
Uploads a medical file, encrypts and stores it on IPFS, logs metadata to the blockchain, and saves it in MongoDB.

### 🔐 Authorization:

Bearer Token (JWT) required.
User must have `canWrite` access to the `patientWallet`.

### 📂 Payload: `multipart/form-data`

| Field           | Type     | Required | Description                                   |
| --------------- | -------- | -------- | --------------------------------------------- |
| `patientWallet` | `string` | ✅       | Patient’s wallet address                      |
| `recordType`    | `string` | ✅       | Type of the medical record (e.g., lab-result) |
| `metadata`      | `string` | ✅       | JSON string containing metadata info          |
| `clinical`      | `string` | ✅       | JSON string containing clinical info          |
| `file`          | `file`   | ✅       | File to upload (e.g. PDF, JPG, etc.)          |

### 📥 Sample Form-Data:

```plaintext
patientWallet: 0xabc123...
recordType: "x-ray"
metadata: {"doctor": "Dr. Adams", "department": "Radiology"}
clinical: {"diagnosis": "No fractures"}
file: [Upload file here]
```

### ✅ Response: `201 Created`

```json
{
  "success": true,
  "recordId": "rec_abc123",
  "transactionHash": "0xhashabc...",
  "ipfsHash": "QmXkY..."
}
```

### ❌ Error Responses:

| Status | Reason                              |
| ------ | ----------------------------------- |
| 400    | No file uploaded / Invalid metadata |
| 403    | No write access to patient records  |
| 500    | IPFS/Blockchain/DB error            |

---

## 📄 2. Get Patient Records

**Endpoint:**
`GET baseUrl/api/records/:patientWallet`

**Description:**
Fetches all active medical records for a given patient.

### 🔐 Authorization:

Bearer Token (JWT) required.
User must have `canRead` access to the `patientWallet`.

### 🔗 URL Parameter:

| Param           | Type     | Description                   |
| --------------- | -------- | ----------------------------- |
| `patientWallet` | `string` | Wallet address of the patient |

### 📥 Sample Request:

```http
GET /api/records/0xabc123...
Authorization: Bearer <token>
```

### ✅ Response: `200 OK`

```json
{
  "count": 2,
  "records": [
    {
      "_id": "651f3...",
      "recordId": "rec_abc123",
      "recordType": "x-ray",
      "ipfsHash": "QmXkY...",
      "blockchainTxHash": "0xhashabc...",
      "metadata": {
        "doctor": "Dr. Adams",
        "department": "Radiology",
        "fileType": "application/pdf",
        "fileSize": 14560,
        "encryptionKey": "..."
      },
      "clinical": {
        "diagnosis": "No fractures"
      },
      "status": "finalized"
    }
  ]
}
```

### ❌ Error Responses:

| Status | Reason                            |
| ------ | --------------------------------- |
| 403    | No read access to patient records |
| 500    | Server/database error             |

---

## 📥 3. Download Medical Record

**Endpoint:**
`GET baseUrl/api/records/download/:recordId`

**Description:**
Downloads the encrypted file associated with a medical record from IPFS.

### 🔐 Authorization:

Bearer Token (JWT) required.

### 🔗 URL Parameter:

| Param      | Type     | Description        |
| ---------- | -------- | ------------------ |
| `recordId` | `string` | Record’s unique ID |

### 📥 Sample Request:

```http
GET /api/records/download/rec_abc123
Authorization: Bearer <token>
```

### ✅ Response:

- HTTP headers:

  ```http
  Content-Disposition: attachment; filename="x-ray_rec_abc123.json"
  Content-Type: application/octet-stream
  ```

- Binary stream of the encrypted file.

### ❌ Error Responses:

| Status | Reason                  |
| ------ | ----------------------- |
| 404    | Record not found        |
| 500    | Failed to download file |

---

## 📡 Realtime Event

Upon successful creation of a medical record, a Socket.IO event is emitted:

**Channel:** `patientWallet`
**Event:** `new-record`

```json
{
  "recordId": "rec_abc123",
  "provider": "0xprovider...",
  "recordType": "x-ray",
  "createdAt": "2025-07-20T14:32:01.456Z"
}
```
