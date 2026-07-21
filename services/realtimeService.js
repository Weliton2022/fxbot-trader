const eventBus = require("../core/eventBus");
const socketServer = require("../socket/socketServer");

// ===================================
// Inicialização
// ===================================

function initialize() {

    console.log("📡 RealtimeService iniciado.");

    registrarEventos();

}

// ===================================
// Registro dos eventos
// ===================================

function registrarEventos() {

    // Exemplo inicial
    eventBus.on("BOT_STATE_CHANGED", (state) => {

        emitir("bot:state", state);

    });

    eventBus.on("TRADE_OPENED", (operation) => {

        emitir("trade:opened", operation);

    });

    eventBus.on("TRADE_CLOSED", (operation) => {

        emitir("trade:closed", operation);

    });

}

// ===================================
// Emit
// ===================================

function emitir(evento, dados) {

    try {

        socketServer.getIO().emit(evento, dados);

    } catch (err) {

        // Socket ainda não iniciado
    }

}

module.exports = {

    initialize,
    emitir

};