const { generateUUID } = require("../../services/crypto-services");
const { savePhoto } = require("../../services/db-services");
const { savePhotoError } = require("../../services/error-services");
const { saveFile } = require("../../services/file-services");

module.exports = {
    async sendPhotos(idWedding, idUser, photo) {
        try {
            console.log("sendPhotos");
            const idPhoto = generateUUID();
            console.log(idPhoto);
            const URL = await saveFile(idWedding, idUser, idPhoto, photo);
            console.log(URL);
            await savePhoto(idPhoto, idWedding, URL);
            const savedPhoto = { idPhoto, idWedding, URL };
            return savedPhoto;
        } catch (err) {
            throw savePhotoError();
        }
    },
};
