require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const APP_ID = process.env.APP_ID;
const privateKey = fs.readFileSync("C:/Users/maxim/OneDrive/Desktop/buildorPython/Buildor/backend/buildortechstackrecommender.2025-02-08.private-key.pem", "utf8");

if (!APP_ID) {
    console.error("❌ ERROR: APP_ID is missing. Check your .env file.");
    process.exit(1);
}

function generateJWT() {
    const payload = {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (10 * 60),
        iss: process.env.APP_ID,
    };

    const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

    console.log("✅ Generated JWT: ", token); // <-- Explicitly log token
    return token;
}

// Run and log result
const jwtToken = generateJWT();
console.log("Your JWT Token:", jwtToken);

module.exports = { generateJWT };