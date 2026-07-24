const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const operationManager = require("../services/operationManager");

class SignalValidator {

    constructor() {

        this.lastSignalKey = null;
        this.lastSignalTime = 0;

        eventBus.on(EVENTS.SIGNAL, (signal) => {

            this.validar(signal);

        });

    }

    validar(signal) {

        console.log("");
        console.log("🟢 PASSO 2");
        console.log("SignalValidator recebeu SIGNAL");
        console.log(signal);
        console.log("");

        // ======================================
        // IGNORA WAIT
        // ======================================

        if (signal.isWait()) {

            console.log("");
            console.log("🚦 SIGNAL VALIDATOR");
            console.log("----------------------------------");
            console.log("Status : Ignorado");
            console.log("Motivo : WAIT");
            console.log("");

            return;

        }

        // ======================================
        // CONFIANÇA
        // ======================================

        if (signal.confidence < 70) {

            console.log("");
            console.log("🚦 SIGNAL VALIDATOR");
            console.log("----------------------------------");
            console.log("Status : Reprovado");
            console.log("Motivo : Confiança insuficiente.");
            console.log("");

            return;

        }

        // ======================================
        // DUPLICIDADE DE SINAL
        // ======================================

        const signalKey = `${signal.strategy}_${signal.signal}_${signal.confidence}`;

        if (
            this.lastSignalKey === signalKey &&
            (Date.now() - this.lastSignalTime) < 1000
        ) {

            console.log("");
            console.log("🚫 SIGNAL DUPLICADO");
            console.log("----------------------------------");
            console.log("Mesmo sinal recebido em menos de 1 segundo.");
            console.log("");

            return;

        }

        this.lastSignalKey = signalKey;
        this.lastSignalTime = Date.now();

        // ======================================
        // OPERAÇÃO EM ANDAMENTO
        // ======================================

        if (operationManager.existeOperacao()) {

            console.log("");
            console.log("🚫 OPERATION MANAGER");
            console.log("----------------------------------");
            console.log("Status : Ignorado");
            console.log("Motivo : Já existe uma operação aberta.");
            console.log("");

            return;

        }

        console.log("");
        console.log("➡️ Entrou no SignalValidator");
        console.log("");

        console.log("🚦 SIGNAL VALIDATOR");
        console.log("----------------------------------");
        console.log("Status : APROVADO");
        console.log("");

        eventBus.emit(EVENTS.EXECUTE_TRADE, signal);

    }

}

module.exports = new SignalValidator();