const { getUserByEmail } = require("../../services/db-services");
const { partnerNotRegistered } = require("../../services/error-services");

module.exports = {
    async checkPartner(email) {
        console.log(":D");
        console.log(email);

        const partnerMail = await getUserByEmail(email);

        /*
            TODO: Darle una vuelta a crear el usuario parcialmente con contraseña genérica y 
            simplemente mandar un mail como "tu pareja te ha invitado" y link a cambio de password
        */
        if (!partnerMail) {
            throw partnerNotRegistered();
        }
    },
};
