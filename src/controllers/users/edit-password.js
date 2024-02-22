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
        console.log(oldPass.password);
        const compare = await validatePassword(pass, oldPass.password);
        console.log(compare);
        if (compare) {
            console.log("same password");
            throw samePassword();
        }
        if (!compare) {
            console.log("Not same password");
            const newPass = await hashPassword(pass);
            const updatePass = await saveNewPass(idUser, newPass);
            console.log("Password changed!");
            return updatePass;
        }
    },
};
