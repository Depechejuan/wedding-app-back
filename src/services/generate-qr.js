const multer = require("multer");
const upload = multer();
const QRCode = require("qrcode");
const path = require("path");
const HOST = process.env.HOST || "localhost";
const { generateUUID } = require("../services/crypto-services");
const { createWeddingCode } = require("./db-services");

module.exports = {
    async generateQR() {
        const uuid = generateUUID();
        const URL = `${HOST}/wedding/${uuid}`;
        const qrCode = await QRCode.toDataURL(URL);
        const qrImagePath = path.join(
            __dirname,
            `../public/qrcodes/${uuid}.png`
        );
        const QR = await QRCode.toFile(qrImagePath, URL);

        return uuid;
    },
};
