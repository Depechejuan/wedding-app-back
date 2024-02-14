"use strict";

const { invalidCredentials } = require("../services/error-services");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.currentuser) {
        const err = invalidCredentials();
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    next();
};
