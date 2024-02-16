const { generateUUID } = require("../../services/crypto-services");
const {
    checkWedding,
    createWeddingCode,
} = require("../../services/db-services");
const { weddingAlreadyCreated } = require("../../services/error-services");
const { generateQR } = require("../../services/generate-qr");
module.exports = {
    async createWedding(idUser1, idUser2, weddingDate) {
        const QR = await generateQR();

        const obj = {
            id: QR,
            idUser1: idUser1,
            idUser2: idUser2,
            weddingDate,
        };
        await createWeddingCode(obj);
        return obj;
    },
};
