"use strict";

const sendError = (res, err, data) => {
    // Añade status como argumento
    console.error(err);
    res.status(err.status).json({
        success: false,
        error: {
            code: err.code,
            message: err.message,
            data,
        },
    });
};

module.exports = { sendError };
