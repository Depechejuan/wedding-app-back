"use strict";
// Librerias
const { Router, json } = require("express");
const { body, validationResult } = require("express-validator");

// Utils
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const { sendError } = require("../utils/send-error");
const { login } = require("../controllers/users/login");
const authGuard = require("../middlewares/auth-guard");
const {
    getUserById,
    weddingData,
    getWeddingPics,
} = require("../services/db-services");
const { createWedding } = require("../controllers/users/create-wedding");
const { checkPartner } = require("../controllers/users/check-partner");
const { registerForce } = require("../controllers/users/register-force");
const { dataInvalid } = require("../services/error-services");
const { editUser } = require("../controllers/users/edit-user");
const { editPass } = require("../controllers/users/edit-password");

const router = Router();

router.post(
    "/register",
    json(),
    [
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 6 }),
        body("acceptedTOS").isBoolean().toBoolean(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = dataInvalid();
            return sendError(res, err, errors.errors);
        }
        try {
            const result = await register(req.body);
            sendResponse(res, result);
        } catch (err) {
            sendError(res, err);
        }
    }
);

router.post(
    "/login",
    json(),
    [
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = dataInvalid();
            return sendError(res, err, errors.errors);
        }
        try {
            const token = await login(req.body);
            sendResponse(res, token);
        } catch (err) {
            sendError(res, err);
        }
    }
);

/*
    This endpoints manage:
    - Check if there's an existing entry "wedding" under your ID
    - If the partner is not register, makes a force register with a generic pass. (TODO: Send email to invited to activate account)
    - Creates the entry on the wedding database in order to be able to upload photos.
    
*/

router.post(
    "/controlpanel/create",
    authGuard,
    [
        body("email").isEmail().normalizeEmail(),
        body("weddingDate")
            .isDate()
            .withMessage(
                "weddingDate debe ser una fecha válida en formato YYYY-MM-DD"
            ),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = dataInvalid();
            return sendError(res, err, errors.errors);
        }
        try {
            const checkWedding = await weddingData(req.currentuser.id);
            if (checkWedding) {
                sendResponse(res, checkWedding);
                return;
            }
            let partner = await checkPartner(req.body.email);
            if (!partner) {
                console.log("register user invited");
                partner = await registerForce(req.body.email);
            }
            const wedding = await createWedding(
                req.currentuser.id,
                partner.id,
                req.body.weddingDate
            );

            sendResponse(res, wedding);
        } catch (err) {
            sendError(res, err);
        }
    }
);

router.get("/controlpanel", authGuard, json(), async (req, res) => {
    try {
        console.log("Accediendo al Control Panel del usuario");
        const idUser = req.currentuser.id;
        const user = await getUserById(idUser);
        const wedding = await weddingData(user.id);
        let photos;
        if (wedding) {
            photos = await getWeddingPics(wedding.id);
        }
        const info = [user];
        if (wedding !== undefined) {
            info.push(wedding);
        }
        if (wedding) {
            const qrFile = { QR: `public/qrcodes/${wedding.id}` };
            info.push(qrFile);
        }
        if (photos !== undefined) {
            info.push(photos);
        }

        sendResponse(res, info);
    } catch (err) {
        sendError(res, err);
    }
});

// pointless?
router.get("/controlpanel/getwedding", authGuard, async (req, res) => {
    try {
        console.log("hola");
        const check = await weddingData(req.currentuser.id);
        let nowedding;
        if (!check) {
            nowedding = "¡No has creado una boda aún!";
            sendResponse(res, nowedding);
            return;
        }

        if (check) {
            // Revisar cuando solucionemos el registro del compañero
            console.log(check.id);
            const data = await getWeddingPics(check.id);
            sendResponse(res, data);
        }
    } catch (err) {
        sendError(res, err);
    }
});

/* EDIT USER */
router.put("/controlpanel/user/:id", authGuard, async (req, res) => {
    const idUser = req.params.id;
    const data = req.body;
    const update = await editUser(idUser, data);

    sendResponse(res, update);
});

router.put("/controlpanel/user/:id/pass", authGuard, async (req, res) => {
    const idUser = req.params.id;
    const pass = req.body.password;
    const update = await editPass(idUser, pass);

    sendResponse(res, update);
});

module.exports = router;
