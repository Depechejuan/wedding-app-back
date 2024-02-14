"use strict";

const jwt = require("jsonwebtoken");
const { invalidCredentials } = require("../../services/error-services");
const {
    generateJWT,
    validatePassword,
} = require("../../services/crypto-services");
const {
    getUserByEmail,
    getPassByEmail,
    getFullUserByEmail,
} = require("../../services/db-services");

module.exports = {
    async login(data) {
        const user = await getUserByEmail(data.email);
        const email = user.email;
        const plainPass = data.password;
        const hashedPass = await getPassByEmail(data.email);

        const passwordMatch = await validatePassword(
            plainPass,
            hashedPass.password
        );

        if (!email) {
            throw invalidCredentials();
        }
        if (!passwordMatch) {
            throw invalidCredentials();
        }
        const userData = {
            id: user.id,
            email: user.email,
        };
        const token = generateJWT({
            id: user.id,
            email: user.email,
        });

        return {
            token,
            userData,
        };
    },
};
