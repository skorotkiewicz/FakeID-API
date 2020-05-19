const express = require("express");
const router = express.Router();
const webCtrl = require("../controllers/website.controller");

router.get("/", webCtrl.index);

module.exports = router;
