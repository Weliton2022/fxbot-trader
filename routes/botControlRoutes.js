const express = require("express");

const router = express.Router();

const botControlController = require("../controllers/botControlController");

router.get("/status", (req, res) => {

    botControlController.status(req, res);

});

router.post("/start", (req, res) => {

    botControlController.start(req, res);

});

router.post("/pause", (req, res) => {

    botControlController.pause(req, res);

});

router.post("/stop", (req, res) => {

    botControlController.stop(req, res);

});

module.exports = router;