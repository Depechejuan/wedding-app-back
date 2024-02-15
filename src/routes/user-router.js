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

const {
    getUserByEmail,
    createWeddingCode,
    checkWedding,
    getUserById,
    weddingData,
} = require("../services/db-services");
const { generateUUID } = require("../services/crypto-services");
const { createWedding } = require("../controllers/users/create-wedding");
const { checkPartner } = require("../controllers/users/check-partner");

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

router.get("/controlpanel", authGuard, json(), async (req, res) => {
    try {
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

        // ADD INFO TO SENDRESPONSE
        sendResponse(res, info);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/wedding/create", authGuard, async (req, res) => {
    try {
        console.log(req.currentuser.id);
        await checkWedding(req.currentuser.id);

        await checkPartner(req.body);
        const partnerMail = await getUserByEmail(data.partner);

        const wedding = await createWedding(req.currentuser.id);

        // if (!partnerMail) {
        //     const errorResponse = partnerNotRegistered();
        //     await sendInvite(data);
        //     sendError(res, errorResponse);
        //     return;
        // }

        const idWedding = await checkWedding(req.currentuser.id);
        sendResponse(res, wedding, idWedding);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/user/:id", authGuard, async (req, res) => {
    sendResponse(res);
});

module.exports = router;
