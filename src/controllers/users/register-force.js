"use strict";

const {
    hashPassword,
    generateUUID,
} = require("../../services/crypto-services");
const { saveUser } = require("../../services/db-services");

require("dotenv").config();

module.exports = {
    async registerForce(email) {
        const password = await hashPassword(process.env.INVITED_PASS);
        const id = generateUUID();

        const user = {
            id,
            email,
            password,
            acceptedTOS: false,
        };
        await saveUser(user);
    },
};
