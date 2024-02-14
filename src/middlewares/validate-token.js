"use strict";

const parseJWT = require("../services/crypto-services.js").parseJWT;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const user = parseJWT(token);
        if (user) {
            req.currentuser = user;
        }
    } else {
        req.currentuser = null;
    }
    next();
};
