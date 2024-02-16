const multer = require("multer");
const upload = multer();
const QRCode = require("qrcode");
const fs = require("fs/promises");
const path = require("path");
const HOST = process.env.HOST || "localhost";
const { genericError } = require("./error-services");
const { generateUUID } = require("./crypto-services");

module.exports = {
    async generateQR() {
        try {
            const uuid = generateUUID();
            const URL = `${HOST}/wedding/${uuid}`;
            await QRCode.toDataURL(URL);
            const qrImagePath = path.join(__dirname, `../../public/qrcodes`);
            await fs.mkdir(qrImagePath, { recursive: true });
            await QRCode.toFile(qrImagePath + `/${uuid}.png`, URL);

            return uuid;
        } catch (err) {
            console.error("Error generating QR:", err);
            throw genericError();
        }
    },
};
