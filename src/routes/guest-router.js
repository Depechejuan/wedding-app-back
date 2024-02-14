"use strict";

const { Router, json } = require("express");
const QRCode = require("qrcode");
const multer = require("multer");
const upload = multer();
const { sendResponse } = require("../utils/send-response");
const { sendError } = require("../utils/send-error");
const authGuard = require("../middlewares/auth-guard");
const softAuth = require("../middlewares/soft-auth");
const { sendPhotos } = require("../controllers/guests/send-photo");
const router = Router();

// to use only on DepecheJuan wedding
router.post("/depeche", json(), upload.array("photo", 3), async (req, res) => {
    console.log("Subiendo la foto a la JuangyBoda!");
    try {
        const data = req.body;
        const wedding = data.WEDDING || "test";
        const user = data.USER_WEDDING || "paco";
        const photos = req.files;

        const sendFile = await sendPhotos(wedding, user, photos[0]);

        sendResponse(res, sendFile);
    } catch (err) {
        console.error(err);
        sendError(res, err);
    }
});

// router.post(
//     "/wedding/:id/upload",
//     softAuth,
//     json(),
//     upload.array("photo", 1),
//     async (req, res) => {
//         try {
//             console.log("hola");
//             const data = req.body;
//             console.log(data);
//             const wedding = data.WEDDING;
//             const user = data.USER_WEDDING;
//             const photo = req.file;
//             console.log(photo);
//             const sendPhoto = await sendPhoto(wedding, user, photo);
//             sendResponse(res, sendPhoto);
//         } catch (err) {
//             console.error(err);
//             sendError(res, err);
//         }
//     }
// );

module.exports = router;
