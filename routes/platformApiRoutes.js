const express = require("express");

const router = express.Router();

const platformController = require("../controllers/platformController");

// =====================================================
// Plataforma
// =====================================================

router.get("/", (req, res) => {

    platformController.get(req, res);

});

module.exports = router;