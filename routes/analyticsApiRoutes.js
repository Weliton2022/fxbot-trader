const express = require("express");

const router = express.Router();

const analyticsApiController = require("../controllers/analyticsApiController");

router.get("/", (req, res) => {

    analyticsApiController.obter(req, res);

});

module.exports = router;