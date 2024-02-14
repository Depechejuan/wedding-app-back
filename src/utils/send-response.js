"use strict";

const sendResponse = (res, data, status = 200) => {
    res.status(status).json({
        success: true,
        data,
        message: res.status ?? null,
    });
};
module.exports = { sendResponse };
