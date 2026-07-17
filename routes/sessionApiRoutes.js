const express = require("express");

const router = express.Router();

const sessionController = require("../controllers/sessionController");

router.get("/", (req, res) => {

    sessionController.dados(req, res);

});

module.exports = router;