const express = require("express");

const router = express.Router();

const configController = require("../controllers/configController");

// ======================================
// CONFIGURAÇÕES
// ======================================

// Obter todas as configurações
router.get("/", (req, res) => {

    configController.get(req, res);

});

// Atualizar configurações
router.post("/", (req, res) => {

    configController.update(req, res);

});

module.exports = router;