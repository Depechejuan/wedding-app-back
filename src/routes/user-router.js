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
    getUserById,
    weddingData,
    getWeddingPics,
} = require("../services/db-services");
const { generateUUID } = require("../services/crypto-services");
const { createWedding } = require("../controllers/users/create-wedding");
const { checkPartner } = require("../controllers/users/check-partner");
const { registerForce } = require("../controllers/users/register-force");

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

router.post("/controlpanel/create", authGuard, async (req, res) => {
    try {
        console.log("¿Existe ya la boda?");
        await weddingData(req.currentuser.id);
        const partner = await checkPartner(req.body.email);
        if (!partner) {
            console.log("register user invited");
            await registerForce(req.body.email);
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
});

router.get("/user/:id", authGuard, async (req, res) => {
    // see other users
    sendResponse(res);
});

module.exports = router;
