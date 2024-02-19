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

/*
    add a "soft-guard" for a little security, where if:
        ID_WEDDIG from LocalStorage is = to req.params.id = ok
    also, checking that USER_WEDDING exists in order to be able to known witch user is uploading
    LocalStorage Data will be inserted in front-end
*/
router.post(
    "/wedding/:id",
    json(),
    upload.array("photo", 3),
    async (req, res) => {
        console.log("!");
        try {
            // Uncomment this line below when front-end is ready
            // const data = req.body;
            const wedding = req.params.id;
            console.log(wedding);
            const user = "test_user";
            // This code is the real one, when front end is ready.
            // const user = data.USER_WEDDING || "test_user";
            console.log(user);
            const photos = req.files;

            const sendFile = await sendPhotos(wedding, user, photos[0]);

            sendResponse(res, sendFile);
        } catch (err) {
            console.error(err);
            sendError(res, err);
        }
    }
);

module.exports = router;
