const express = require("express");

const router = express.Router();

const performanceController = require("../controllers/performanceController");

router.get("/", (req, res) => {

    performanceController.dados(req, res);

});

module.exports = router;