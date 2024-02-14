"use strict";

const { Router, json } = require("express");
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const {
    partnerNotRegistered,
    weddingAlreadyCreated,
} = require("../services/error-services");
const { sendError } = require("../utils/send-error");
const { login } = require("../controllers/users/login");
const authGuard = require("../middlewares/auth-guard");
const { generateQR } = require("../services/generate-qr");
const {
    getUserByEmail,
    createWeddingCode,
    checkWedding,
    getUserById,
    weddingData,
} = require("../services/db-services");
const { generateUUID } = require("../services/crypto-services");

const router = Router();

router.post("/register", json(), async (req, res) => {
    try {
        const result = await register(req.body);
        sendResponse(res, result);
    } catch (err) {
        sendError(res, err);
    }
});

router.post("/login", json(), async (req, res) => {
    try {
        const token = await login(req.body);
        sendResponse(res, token);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/wedding/create", authGuard, async (req, res) => {
    console.log(req.currentuser.id);
    const check = await checkWedding(req.currentuser.id);
    console.log(".........");
    console.log(check);
    if (check.length > 0) {
        const idWedding = check[0].id;
        const errorResponse = weddingAlreadyCreated();
        sendError(res, errorResponse, idWedding);
        return;
    }

    const data = req.body;
    const partnerMail = await getUserByEmail(data.partner);
    // if (!partnerMail) {
    //     const errorResponse = partnerNotRegistered();
    //     await sendInvite(data);
    //     sendError(res, errorResponse);
    //     return;
    // }

    const QR = await generateQR();
    console.log(QR);
    const obj = {
        id: generateUUID(),
        weddingCode: QR,
        idUser1: req.currentuser.id,
        idUser2: partnerMail.id,
        weddingDate: data.date,
    };

    await createWeddingCode(obj);
    const idWedding = await checkWedding(req.currentuser.id);
    sendResponse(res, obj, idWedding);
});

router.get("/controlpanel", authGuard, json(), async (req, res) => {
    console.log("Empezamos CP");
    const idUser = req.currentuser.id;
    console.log(idUser);
    const user = await getUserById(idUser);
    const idWedding = await checkWedding(idUser);
    if (!idWedding) {
        console.log("No hay wedding!");
        sendResponse(res, user);
        return;
    }
    const wedding = await weddingData(idWedding.id);
    const info = [user, wedding];
    sendResponse(res, info);
});

router.get("/user/:id", authGuard, async (req, res) => {
    sendResponse(res);
});

module.exports = router;
