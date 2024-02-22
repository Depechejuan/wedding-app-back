"use strict";

const {
    validatePassword,
    hashPassword,
} = require("../../services/crypto-services");
const { getCryptoPass, saveNewPass } = require("../../services/db-services");
const { samePassword } = require("../../services/error-services");

module.exports = {
    async editPass(idUser, pass) {
        const oldPass = await getCryptoPass(idUser);
        const compare = await validatePassword(pass, oldPass.password);
        if (compare) {
            throw samePassword();
        }
        if (!compare) {
            const newPass = await hashPassword(pass);
            const updatePass = await saveNewPass(idUser, newPass);
            return updatePass;
        }
    },
};
