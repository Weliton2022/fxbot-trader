const express = require("express");

const router = express.Router();

const historyApiController = require("../controllers/historyApiController");

router.get("/", (req, res) => {

    historyApiController.listar(req, res);

});

module.exports = router;