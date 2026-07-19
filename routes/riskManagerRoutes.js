const express = require("express");

const router = express.Router();

const riskManagerController = require("../controllers/riskManagerController");

router.get(

    "/",

    riskManagerController.obter

);

module.exports = router;