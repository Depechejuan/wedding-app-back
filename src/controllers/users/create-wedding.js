const {
    checkWedding,
    createWeddingCode,
} = require("../../services/db-services");
const { weddingAlreadyCreated } = require("../../services/error-services");
const { generateQR } = require("../../services/generate-qr");
module.exports = {
    async createWedding(id) {
        console.log(":)");
        console.log(id);

        const QR = await generateQR();
        console.log(QR);

        const obj = {
            id: generateUUID(),
            weddingCode: QR,
            idUser1: req.currentuser.id,
            idUser2: partnerMail.id,
            weddingDate: data.date,
        };

        await createWeddingCode(obj);
        return obj;
    },
};
