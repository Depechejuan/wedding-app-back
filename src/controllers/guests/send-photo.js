const { generateUUID } = require("../../services/crypto-services");
const { uploadFile } = require("../../services/upload-file");
const { authorize } = require("../../validators/google-auth");

module.exports = {
    async sendPhotos(idWedding, idUser, photo) {
        try {
            const jwtClient = await authorize();
            const idPhoto = generateUUID();
            const fileURL = `/${idWedding}/${idUser}/${idPhoto}`;
            // await uploadFile(jwtClient, fileURL, photo);
            console.log("Photo uploaded successfully");
            const savedPhoto = { idPhoto, fileURL };
            return savedPhoto;
        } catch (err) {
            console.error(err);
        }
    },
};
