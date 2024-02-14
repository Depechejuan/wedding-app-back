"use strict";

require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const { sendError } = require("./src/utils/send-error.js");
const validateToken = require("./src/middlewares/validate-token.js");
const appRouter = require("./src/routes/app-router.js");

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(validateToken);
app.use(appRouter);

const staticDirectory = path.join(__dirname, "(/pictures/");
app.use(express.static(staticDirectory));

app.use((err, req, res, next) => {
    console.error(err);
    sendError(res, err);
});

app.use((req, res) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
        message: `Unknown Endpoint: ${req.method} ${req.path}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
