const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/", (req, res) => {

    dashboardController.index(req, res);

});

module.exports = router;