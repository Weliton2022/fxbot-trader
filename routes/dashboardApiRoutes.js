const express = require("express");

const router = express.Router();

const dashboardApiController = require("../controllers/dashboardApiController");

router.get("/", (req, res) => {

    dashboardApiController.obter(req, res);

});

module.exports = router;