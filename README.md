# Login Application

A full-stack, responsive login application featuring a premium "LOGIN" UI theme. Built with React (Vite) and Tailwind CSS on the frontend, and Node.js with Express on the backend. This project includes secure authentication, credential validation, a welcome dashboard, and follows modern web development best practices.

## 🚀 Features

*   **Premium UI Design**: A sophisticated split-screen login page with rich gradients and a professional dashboard layout.
*   **Secure Authentication**: Passwords are mathematically hashed using `bcrypt` to prevent plain-text exposure.
*   **Rate Limiting**: Brute-force protection on the login endpoint using `express-rate-limit`.
*   **Persistent Sessions**: "Remember me" functionality securely stores the validated username for subsequent logins utilizing LocalStorage.
*   **Form Validation & Error Handling**: Real-time API feedback with animated error states (shake effects).
*   **Environment Configuration**: Complete separation of secrets using `dotenv`.
*   **Vercel Deployment Ready**: Pre-configured `vercel.json` files for seamless serverless deployment.

## 🛠️ Tech Stack

**Frontend:**
*   React 18 (via Vite)
*   Tailwind CSS (Styling & Animations)
*   React Router v6 (Navigation)
*   Axios (HTTP requests)

**Backend:**
*   Node.js
*   Express.js
*   Bcrypt (Password Hashing)
*   Cors & Express-Rate-Limit (Security Middleware)

## 💻 Running Locally

Follow these instructions to get the application running on your local machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   npm (comes with Node.js)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd login-app-assignment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend/` directory with the following contents:
```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
VALID_USERNAME=admin
# The hash below corresponds to the password 'admin'
VALID_PASSWORD_HASH=$2b$10$c0azwhjr4Kg.toEZRtv67..xN0uWONjLzBoDwy2oS4wgztAKt6RY2
```

**Generate SSL Certificates (For local HTTPS):**
To mimic production environments and avoid mixed-content issues later, the local backend is configured to run on HTTPS. Generate self-signed certificates by running:
```bash
node generate-cert.js
```
*Note: This creates `key.pem` and `cert.pem` in your backend folder.*

**Start the Backend Server:**
```bash
# For development with auto-restart
npx nodemon server.js
```
The server will start at `https://localhost:5000`. 
> **Important Browser Note**: Because it's a self-signed certificate, your browser will flag it as insecure initially. To fix this, navigate directly to `https://localhost:5000/health` in your browser, click **"Advanced"**, and choose **"Proceed to localhost"**. You must do this before the frontend can connect to it.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

**Start the Frontend Server:**
```bash
npm run dev
```
The application will open at `http://localhost:5173`.

### 4. Test Credentials
Use the following demo credentials to access the dashboard:
*   **Username**: `admin`
*   **Password**: `admin`

## ☁️ Deployment (Vercel)

This application is configured as a monorepo containing two separate applications, allowing independent deployment on Vercel.

**Backend Deployment**:
1. Import the repository in Vercel.
2. Set the Root Directory to `backend`. (Leave Build Command blank).
3. Add the exact same environment variables (`VALID_USERNAME`, `VALID_PASSWORD_HASH`) in the Vercel settings. For `CORS_ORIGIN`, use `*` or your frontend URL without a trailing slash.
4. Deploy! Vercel uses the pre-configured `vercel.json` to handle serverless routing.

**Frontend Deployment**:
1. Import the repository in Vercel as a new project.
2. Set the Root Directory to `frontend`.
3. Set the Framework Preset to **Vite**.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL. **Ensure there is absolutely NO trailing slash at the end of the URL.**
5. Deploy!
