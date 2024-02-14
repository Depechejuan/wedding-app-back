const { getConnection } = require("../database/mysql-connection");
const db = getConnection();

module.exports = {
    async getUserByEmail(email) {
        const statement = `
        SELECT * FROM users WHERE users.email = ?`;
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
        SELECT id, firstName, lastName, email, birthDate, city, country, avatarUrl, gender, role
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
        INSERT INTO weddings(id, weddingCode, idUser1, idUser2, weddingDate)
        VALUES (?, ?, ?, ?, ?)
        `;
        const [rows] = await db.execute(statement, [
            data.id,
            data.weddingCode,
            data.idUser1,
            data.idUser2,
            data.weddingDate,
        ]);
    },

    async checkWedding(id) {
        const statement = `
            SELECT weddings.id
            FROM weddings
            INNER JOIN users ON weddings.idUser1 = users.id OR weddings.idUser2 = users.id
            WHERE users.id = ?;
        `;
        const [rows] = await db.execute(statement, [id]);
        return rows[0];
    },

    async weddingData(id) {
        const statement = `
        SELECT * FROM weddings WHERE id = ?
        `;
        const [rows] = await db.execute(statement, [id]);
        return rows[0];
    },

    // revisar logica
    async editUser(idUser, data) {
        const statement = `
            UPDATE users
                SET name = ?, lastName = ?, birthday = ?, country = ?, city = ?, avatarURL = ?, role = ?, modifiedAt = ?
            WHERE id = ?`;
        const [rows] = await db.execute(statement, [
            data.name ?? null,
            data.lastname ?? null,
            data.birthday ?? null,
            data.country ?? null,
            data.city ?? null,
            data.avatarURL ?? null,
            data.role ?? null,
            data.modifiedAt,
            idUser,
        ]);
        return rows;
    },
};
