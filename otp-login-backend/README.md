# OTP-Based Login System with Audit Logging  
### MERN Stack – Backend Implementation

---

## 1. Overview

This project implements a **secure OTP-based authentication system** that enables users to log in using either an **email address or mobile number**.  
Built using the **MERN stack (backend only)**, it includes a **comprehensive audit logging mechanism** to record every API call and OTP lifecycle event, ensuring complete traceability and security.

---

## 2. Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **bcrypt** – for secure OTP hashing

---

## 3. Key Features

### Authentication
- OTP-based login via **email** or **mobile number**
- Automatic user creation for new identifiers
- OTP expiry and verification limit enforcement
- Secure OTP resend functionality with capped resend attempts
- Automatic invalidation of previously generated OTPs on resend

### Security
- OTPs are **never stored in plain text**
- OTPs are securely **hashed using bcrypt**
- OTPs are **never returned** in API responses

### Audit Logging (Mandatory)
- Every API request is recorded in the **audit logs** collection
- Each log entry includes:
  - API endpoint name  
  - Execution step  
  - Status (INFO / SUCCESS / FAILURE)  
  - Descriptive message  
  - Timestamp  
  - Unique **trace ID**
- Enables a complete **audit trail** for user authentication actions

---

## 4. API Endpoints

### 4.1 Send OTP  
**POST** `/api/otp/send`

**Request**
{
"identifier": "test@gmail.com"
}
**Response**
{
"message": "OTP sent successfully"
}

---

### 4.2 Verify OTP  
**POST** `/api/otp/verify`

**Request**
{
"identifier": "test@gmail.com",
"otp": "123456"
}

**Response**

---

### 4.3 Resend OTP  
**POST** `/api/otp/resend`

**Request**
{
"identifier": "test@gmail.com"
}

**Response**
{
"message": "OTP resent"
}


---

## 5. Database Design

### Collections Used

#### 5.1 Users (`users`)
| Field | Type | Description |
|-------|------|-------------|
| `identifier` | String | Email or mobile number |
| `type` | String | Type of identifier (`email` or `mobile`) |
| `createdAt` | Date | Timestamp of user creation |

#### 5.2 OTP Requests (`otprequests`)
| Field | Type | Description |
|-------|------|-------------|
| `identifier` | String | Email or mobile number |
| `otpHash` | String | Hashed OTP (using bcrypt) |
| `status` | String | PENDING / VERIFIED / EXPIRED |
| `expiresAt` | Date | OTP expiry timestamp |
| `attempts` | Number | Number of failed verification attempts |
| `resendCount` | Number | OTP resend attempt count |

#### 5.3 Audit Logs (`auditlogs`)
| Field | Type | Description |
|-------|------|-------------|
| `traceId` | String | Unique identifier for the API request |
| `api` | String | API endpoint name |
| `step` | String | Description of the execution step |
| `status` | String | INFO / SUCCESS / FAILURE |
| `message` | String | Detailed action message |
| `timestamp` | Date | Log creation timestamp |

---

## 6. Project Setup and Execution

### Prerequisites
- Node.js **v18** or higher  
- MongoDB running **locally**

### Installation
npm install

### Run the Application
npm run dev

The server runs on **port 5050** by default.

---
## 7. Testing and Verification

- All APIs were tested using **Postman**
- Database records were validated using **MongoDB Shell (`mongosh`)**
- Screenshots were captured for:
  -  Send OTP API  
  -  Verify OTP API  
  -  Resend OTP API  
  -  Users collection  
  -  OTP Requests collection  
  -  Audit Logs collection  
---

## 8. System Constraints and Limits

| Parameter | Limit / Description |
|------------|--------------------|
| OTP validity duration | **5 minutes** |
| Maximum OTP verification attempts | **3** |
| Maximum OTP resend attempts | **3** |
| Invalidation | All previous OTPs are **invalidated** upon resend |

---

**Author:** *[Devashish Tushar_2022UEC1487]*  
**Stack:** MERN (Backend Only)  
**Port:** 5050  

---
