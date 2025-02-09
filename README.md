# MERN File Sharing Platform

## Overview

This is a **MERN stack**-based file-sharing platform that allows users to send files without signing up. It generates a shareable link and sends it via email to the recipient. Logged-in users can manage their previously shared files. All files are automatically deleted after **24 hours**.

## Features

- **File sharing without signup**: Generates a link to share with others.
- **Email notification**: Sends the file link to the recipient's email.
- **User dashboard**: Logged-in users can manage shared files.
- **Automatic file deletion**: Files are removed after **24 hours**.
- **File size limits**:
  - **Without login**: 100MB
  - **With login**: 200MB
- **Tech stack**: MERN (MongoDB, Express, React, Node.js), Cloudinary, Tailwind CSS.

---

## Tech Stack

- **Frontend**: React.js (Tailwind CSS for styling)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: Nodemailer
- **Scheduled Cleanup**: Cron job to delete expired files

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Cloud-based like MongoDB Atlas)
- **Cloudinary Account** (For file storage)

### 1. Clone the Repository

```bash
git clone https://github.com/Shivam-ssy/ShareItNow.git
cd ShareItNow
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file in the `backend` folder:

```env
BACKEND_URL=http://localhost:3000
REGISTER_URL=/api/v1/users/register
LOGIN_URL=/api/v1/users/login
DB_NAME=userprofile
DB_URL=
DB_URL=
UPLOAD_URL=/api/files
DOWNLOAD_URL=/files/:uuid
FILE_DOWNLOAD_URL=/files/download/:uuid
USER_HOME=/home
frontend_url=http://localhost:5173
SECREATE_KEY=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=2h
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=1d
DOMAIN=localhost
CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEY=
CLOUDINARY_CLOUD_NAME=
PASS=
```

#### Start the Backend Server

```bash
npm run Start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```
#### Create a `.env` file in `Fronted` Folder

All the Routes are in env file

```env
VITE_BACKEND_URL="http://localhost:3000"
VITE_REGISTER_URL="http://localhost:3000/api/v1/users/register"
VITE_LOGIN_URL="http://localhost:3000/api/v1/users/login"
VITE_GET_CURRENT_USER="http://localhost:3000/api/v1/users/current-user"
VITE_CHANGE_PASSWORD="http://localhost:3000/api/v1/users/change-password"
VITE_LOGOUT_USER="http://localhost:3000/api/v1/users/logout"
VITE_UPLOAD_URL="http://localhost:3000/api/v1/files/upload"
VITE_UPLOADANY_URL="http://localhost:3000/api/v1/files/sendfile"
VITE_GET_FILES="http://localhost:3000/api/v1/files/files"
VITE_HOME_URL="http://localhost:3000/home"
VITE_DOWNLOAD_PAGE="http://localhost:5173/download"
VITE_DOWNLOAD_URL="http://localhost:3000/api/v1/files/getfileinfo"

```



#### Start the Frontend Server

```bash
npm run dev
```

---

## Usage

### Uploading a File (Without Login)

1. Visit the home page.
2. Upload a file (Max **100MB**).
3. Click "Generate Link".
4. Copy the link or send it via email.

### Uploading a File (With Login)

1. Register/Login to the platform.
2. Upload a file (Max **200MB**).
3. View and manage all previously shared files.
4. Files are automatically deleted after **24 hours**.

---


## Security Considerations

- **File Size Restriction**: Enforced on both frontend and backend.
- **Access Control**: Users can only manage their own shared files.
- **Email Verification**: Ensures correct recipient.
- **Automatic Cleanup**: Deletes files after **24 hours** using a cron job.

---

## Future Improvements

- File type validation.
- Password-protected file sharing.
- Multi-file upload support.

---

## Contributors

- **Shivam Singh Yadav** - [GitHub](https://github.com/Shivam-ssy)

---

##

