const express = require("express");
const router = express.Router();
const fakeid = require("../controllers/api.controller");

router.get("/random", fakeid.random); // GET /api/random    [ Genrate random FakeID ]

router.get(
  "/Gender/:gender/NameSet/:nameset/Country/:country",
  fakeid.generateId
); // GET /api/Gender/:gender/NameSet/:nameset/Country/:country   [ Generate FakeID ]

module.exports = router;
