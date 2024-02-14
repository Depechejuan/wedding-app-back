"use strict";

const { invalidCredentials } = require("../services/error-services");

module.exports = (req, res, next) => {
    if (req.headers.wedding) {
        const err = invalidCredentials();
        return res.statu(err.statusCode).json({
            error: err.message,
        });
    }
    next();
};
