const path = require("path");
const fs = require("fs/promises");
const { savePhotoError } = require("./error-services");

module.exports = {
    async saveFile(idWedding, idUser, idPhoto, photo) {
        try {
            console.log(photo);
            const directory = path.join(__dirname, `../../public/${idWedding}`);
            await fs.mkdir(directory, { recursive: true });
            const fileName = `${idUser} - ${idPhoto}.webp`;
            const filePath = path.join(directory, fileName);
            await fs.writeFile(filePath, photo.buffer);
            const URL = `${idWedding}/${fileName}`;
            return URL;
        } catch (err) {
            console.log(err);
            console.error(err);
            throw savePhotoError();
        }
    },

    // maybe useless or maybe useful for couple if they don't want that photo?
    async deleteFile(idWedding) {
        const directory = path.join(__dirname, "../../public/", idWedding);
        const folderPath = path.join(directory);

        try {
            await fs.rmdir(folderPath, { recursive: true });
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    },
};
