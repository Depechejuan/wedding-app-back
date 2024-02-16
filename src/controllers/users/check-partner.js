const { getUserByEmail } = require("../../services/db-services");
const { partnerNotRegistered } = require("../../services/error-services");

module.exports = {
    async checkPartner(email) {
        const partnerMail = await getUserByEmail(email);
        return partnerMail;
    },
};
