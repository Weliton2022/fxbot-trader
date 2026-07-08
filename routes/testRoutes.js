const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

router.get("/proposal", (req, res) => {

    testController.proposal(req, res);

});

module.exports = router;