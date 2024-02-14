"use strict";

const {
    hashPassword,
    generateUUID,
} = require("../../services/crypto-services");
const { saveUser, getUserByEmail } = require("../../services/db-services");
const {
    didNotAcceptedTOS,
    emailAlreadyRegistered,
} = require("../../services/error-services");

module.exports = {
    async register(data) {
        const alreadyReg = await getUserByEmail(data.email);
        if (alreadyReg) {
            emailAlreadyRegistered();
        }
        if (!data.acceptedTOS) {
            didNotAcceptedTOS();
        }

        const hashedPass = await hashPassword(data.password);
        const id = generateUUID();

        const user = {
            ...data,
            id,
            password: hashedPass,
        };
        await saveUser(user);

        return {
            success: true,
            user,
        };
    },
};
