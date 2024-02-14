"use strict";
const { Router } = require("express");
const userRouter = require("./user-router.js");
const guestRouter = require("./guest-router.js");
const router = Router();
router.use(userRouter);
router.use(guestRouter);
module.exports = router;
