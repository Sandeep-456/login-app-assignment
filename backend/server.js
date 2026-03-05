require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(cors()); // Allow all origins for Vercel deployment
app.use(express.json());

// Rate limiting: max 100 requests per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many login attempts, please try again later." },
});

// ── Credentials ───────────────────────────────────────────────────────────────
const VALID_USERNAME = process.env.VALID_USERNAME || "admin";
const VALID_PASSWORD_HASH = process.env.VALID_PASSWORD_HASH;

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /login
 * Body: { username: string, password: string }
 */
app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Validate username
    if (username !== VALID_USERNAME) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. Please try again." });
    }

    // Validate password against hash
    const passwordMatch = await bcrypt.compare(password, VALID_PASSWORD_HASH);

    if (passwordMatch) {
      return res.status(200).json({
        message: "Login successful.",
        username,
      });
    }

    // Hash didn't match
    return res
      .status(401)
      .json({ message: "Invalid credentials. Please try again." });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// ── Start Server ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  // Local development with self-signed HTTPS
  try {
    const options = {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(
        `✅  Backend server running securely at https://localhost:${PORT}`,
      );
    });
  } catch (err) {
    console.error("Local certs not found, fallback to HTTP");
    app.listen(PORT, () => {
      console.log(`✅  Backend server running at http://localhost:${PORT}`);
    });
  }
}

// Export for Vercel Serverless
module.exports = app;
