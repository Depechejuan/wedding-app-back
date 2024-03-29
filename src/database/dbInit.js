"use strict";

require("dotenv").config();
const addData = require("./add-data");
const { createPool } = require("./mysql-connection");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const dbInit = async () => {
    const pool = createPool();
    console.log("Deleting previous data...");
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    console.log("Database sucessfuly deleted");
    console.log("Creating new Data Base");
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    console.log("Database created");
    await pool.query(`USE ${DATABASE_NAME}`);
    console.log("Database created successfuly");
    await createTables(pool);
    console.log("Tables created");
    await addData(pool);
    console.log("Data added");
    console.log("All done");
    await pool.end();
};

async function createTables(pool) {
    // Eliminé "Role", creo que no aporta nada generar que seas usuario o prometido.
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id CHAR(36) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            birthDate TIMESTAMP,
            city VARCHAR(255),
            country VARCHAR(255),
            avatarURL VARCHAR(255),
            gender ENUM('Male', 'Female', 'Non-Binary'),
            admin BOOLEAN DEFAULT false NOT NULL,
            acceptedTOS BOOLEAN NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP
        );
    `);
    /*
        ¿Es necesario el "role"? 
    */
    await pool.query(`
        CREATE TABLE IF NOT EXISTS weddings(
            id CHAR(36) PRIMARY KEY,
            idUser1 CHAR(36) NOT NULL,
            idUser2 CHAR(36) NOT NULL,
            weddingDate TIMESTAMP NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP,
            FOREIGN KEY (idUser1) REFERENCES users(id),
            FOREIGN KEY (idUser2) REFERENCES users(id)
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS photos(
            id CHAR(36) PRIMARY KEY,
            idWedding CHAR(36) NOT NULL,
            photoURL VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idWedding) REFERENCES weddings(id)
        );
    `);
}

dbInit();
