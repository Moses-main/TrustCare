## 📘 `README.md` — Auth API Documentation

```markdown
# 🛡️ DHRS Platform - Authentication API

This is the authentication module for the Digital Health Records System (DHRS). It provides user registration, login, password reset, and token-based authentication for patients, providers, and admins.

---

## 🔗 Base URL
```

[https://dhrs.onrender.com/api/auth](https://dhrs.onrender.com/api/auth)

````

---

## 📦 Features

- ✅ User registration (`/signup`)
- ✅ User login (`/login`)
- ✅ Password reset (`/forgot-password` & `/reset-password/:token`)
- ✅ Protected route to fetch user data (`/me`)
- ✅ Password update (`/update-password`)

---

## 📁 API Endpoints

---

### 🔐 1. `POST /signup` — Register a new user

**Request Body:**

```json
{
  "name": "Moses Sunday",
  "email": "moses@example.com",
  "password": "moses123",
  "role": "patient"
}
````

**Response:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "role": "patient"
  }
}
```

---

### 🔐 2. `POST /login` — Log in

**Request Body:**

```json
{
  "email": "moses@example.com",
  "password": "moses123"
}
```

**Response:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "role": "patient"
  }
}
```

---

### 🔐 3. `POST /forgot-password` — Request password reset

**Request Body:**

```json
{
  "email": "moses@example.com"
}
```

**Response:**

```json
{
  "message": "Reset link sent (check logs)",
  "resetURL": "http://localhost:5000/api/auth/reset-password/<token>"
}
```

> 💡 The reset link will also be logged to the server console.

---

### 🔐 4. `POST /reset-password/:token` — Reset password with token

**Endpoint Example:**

```
POST /reset-password/abc123resettoken
```

**Request Body:**

```json
{
  "password": "newSecurePassword123"
}
```

**Response:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "name": "...",
    "email": "moses@example.com"
  }
}
```

---

### 🔐 5. `GET /me` — Get current logged-in user

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "user": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "role": "patient"
  }
}
```

---

### 🔐 6. `PUT /update-password` — Update password (logged-in users only)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newSecurePassword123"
}
```

**Response:**

```json
{
  "token": "<new_jwt_token>",
  "user": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "role": "patient"
  }
}
```

---

## 🔧 Setup

### 1. Clone the repo

```bash
git clone https://github.com/Moses-main/Decentralized-Healthcare-Records-System.git
cd Decentralized-Healthcare-Records-System/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGODB_URI=https://dhrs.onrender.com/api/auth
JWT_SECRET=yourSuperSecretKey
FRONTEND_URL=http://localhost:3000
```

### 4. Run the server

```bash
npm run dev
```

---

## 🧪 Testing with Postman

- Use `POST /signup` and `POST /login` to generate JWTs
- Copy the token into your Postman `Authorization` header using:

  ```
  Bearer <token>
  ```

- Test protected routes like `/me` and `/update-password`

---

## 👨‍⚕️ Roles

- `patient` – Default user role
- `provider` – Health service provider
- `admin` – (Optional for advanced access control)

---

## 📄 License

MIT © Moses Sunday

```

---

```
