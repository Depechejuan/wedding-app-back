const { generateUUID, hashPassword } = require("../services/crypto-services");

require("dotenv").config();

async function addData(pool) {
    const plainPass = process.env.ADMINPASS;
    const adminUser = process.env.ADMINUSER;
    const id = generateUUID();
    const hashedPass = await hashPassword(plainPass);
    const birthday = process.env.DATE;
    const city = process.env.CITY;
    const country = process.env.COUNTRY;

    console.log("Creating Admin User");
    await pool.query(
        "INSERT INTO users (id, email, password, birthDate, city, country, gender, admin, acceptedTOS) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, adminUser, hashedPass, birthday, city, country, "Male", true, true]
    );
}

module.exports = addData;
