"use strict";
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 12);
    },

    async validatePassword(plainPassword, hash) {
        try {
            const pass = await bcrypt.compare(plainPassword, hash);
            console.log("Comparison result:", pass);
            return pass;
        } catch (error) {
            console.error("Error during password validation:", error);
            throw error;
        }
    },

    generateUUID() {
        return crypto.randomUUID();
    },

    parseJWT(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return { ...payload, token };
        } catch {
            return null;
        }
    },

    generateJWT(token) {
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey || typeof secretKey !== "string") {
            console.error("Error: JWT secret key is missing or invalid.");
            throw new Error("JWT secret key is missing or invalid.");
        }
        return jwt.sign(token, secretKey, {
            expiresIn: "10d",
        });
    },
};
