const { getConnection } = require("../database/mysql-connection");
const db = getConnection();

module.exports = {
    async getUserByEmail(email) {
        const statement = `SELECT * FROM users WHERE users.email = ?`;
        const [rows] = await db.execute(statement, [email]);
        return rows[0];
    },

    async getPassByEmail(email) {
        const statement = `
        SELECT password FROM users WHERE users.email = ?`;
        const [rows] = await db.execute(statement, [email]);
        return rows[0];
    },

    async getUserById(idUser) {
        const statement = `
        SELECT id, email, password, firstName, lastName, birthDate, city, country, avatarUrl, gender
        FROM users
        WHERE id = ?`;
        const [rows] = await db.execute(statement, [idUser]);
        return rows[0];
    },

    async saveUser(user) {
        const statement = `
            INSERT INTO users(
                id, email, password, acceptedTOS
            )
            VALUES (?, ?, ?, ?  )`;
        const [rows] = await db.execute(statement, [
            user.id,
            user.email,
            user.password,
            user.acceptedTOS,
        ]);
        return rows;
    },

    async createWeddingCode(data) {
        const statement = `
        INSERT INTO weddings(id, idUser1, idUser2, weddingDate)
        VALUES (?, ?, ?, ?)
        `;
        await db.execute(statement, [
            data.id,
            data.idUser1,
            data.idUser2,
            data.weddingDate,
        ]);
    },

    async getWeddingPics(id) {
        const statement = `
            SELECT *
            FROM photos
            WHERE idWedding = ?;
        `;
        const [rows] = await db.execute(statement, [id]);
        return rows[0];
    },

    async weddingData(id) {
        const statement = `
            SELECT * FROM weddings WHERE idUser1 = ? OR idUser2 = ? 
        `;
        const [rows] = await db.execute(statement, [id, id]);
        return rows[0];
    },

    async savePhoto(idPhoto, idWedding, photoURL) {
        const statement = `
            INSERT INTO photos(id, idWedding, photoURL)
            VALUES(?, ?, ?)
        `;

        const [rows] = await db.execute(statement, [
            idPhoto,
            idWedding,
            photoURL,
        ]);
        return rows;
    },

    // revisar logica
    async saveEditUser(idUser, data) {
        const statement = `
            UPDATE users
                SET firstName = ?, lastName = ?, birthDate = ?, city = ?, country = ?, avatarURL = ?, gender = ?, modifiedAt = ?
            WHERE id = ?`;
        const [rows] = await db.execute(statement, [
            data.firstName ?? null,
            data.lastName ?? null,
            data.birthDate ?? null,
            data.city ?? null,
            data.country ?? null,
            data.avatarURL ?? null,
            data.gender ?? null,
            data.modifiedAt,
            idUser,
        ]);
        return rows;
    },

    async getCryptoPass(idUser) {
        const statement = `SELECT password FROM users WHERE id = ?`;
        const [rows] = await db.execute(statement, [idUser]);
        return rows[0];
    },

    async saveNewPass(idUser, newPass) {
        const statement = `
        UPDATE users
            SET password = ?
        WHERE id = ?`;
        const [rows] = await db.execute(statement, [newPass, idUser]);
        return rows;
    },
};
