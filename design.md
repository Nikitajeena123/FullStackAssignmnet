# Design Document – Patient Document Portal

## 1. Tech Stack Choices

### Q1. Frontend Framework

**React (Vite)**

- Fast development
- Component-based structure
- Easy API calling using Axios

### Q2. Backend Framework

**Node.js + Express**

- Simple routing
- Easy file uploads with Multer
- Good for lightweight REST APIs

### Q3. Database

**SQLite**

- No server installation needed
- Ideal for small projects
- Easy SQL queries

### Q4. Scaling for 1,000 users

- Move files to cloud storage (AWS S3)
- Use PostgreSQL instead of SQLite
- Add authentication (JWT)
- Add caching (Redis)
- Deploy backend behind load balancer

---

## 2. Architecture Overview

### Explanation

- User uploads PDF → frontend sends form-data
- Backend stores file using Multer
- Metadata stored in SQLite
- User can download/delete files using API

---

## 3. API Specification

### 1) Upload PDF

**POST /documents/upload**

- Body: `multipart/form-data`
- Field name: `file`
- Response: `{ "message": "File uploaded successfully" }`

### 2) List all documents

**GET /documents**

- Returns array of files

### 3) Download file

**GET /documents/:id**

- Sends the actual PDF file

### 4) Delete file

**DELETE /documents/:id**

- Deletes from DB + uploads folder

---

## 4. Data Flow Description

### Upload Flow

1. User selects PDF
2. `UploadForm` sends to `/documents/upload`
3. Multer stores file in `uploads/`
4. Metadata stored in SQLite
5. Frontend refreshes list

### Download Flow

1. User clicks "Download"
2. Browser hits `/documents/:id`
3. Server streams file using `res.download()`

---

## 5. Assumptions

- Only one user (no authentication)
- Only PDF files allowed
- Max size ~10MB
- uploads/ folder always exists
- Local development only (not deployed)

---

# End of Design Document
