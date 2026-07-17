const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const riskService = require("../services/riskService");

const operationManager = require("../services/operationManager");

class SignalValidator {

    constructor() {

        eventBus.on(EVENTS.SIGNAL, (signal) => {

            this.validar(signal);

        });

    }

    validar(signal) {

        if (signal.isWait()) {

            console.log("");
            console.log("🚦 SIGNAL VALIDATOR");
            console.log("----------------------------------");
            console.log("Status : Ignorado");
            console.log("Motivo : WAIT");
            console.log("");

            return;

        }

        if (signal.confidence < 70) {

            console.log("");
            console.log("🚦 SIGNAL VALIDATOR");
            console.log("----------------------------------");
            console.log("Status : Reprovado");
            console.log("Motivo : Confiança insuficiente.");
            console.log("");

            return;

        }

        if (operationManager.existeOperacao()) {

            console.log("");
            console.log("🚫 OPERATION MANAGER");
            console.log("----------------------------------");
            console.log("Status : Ignorado");
            console.log("Motivo : Já existe uma operação aberta.");
            console.log("");

            return;

        }

        const risco = riskService.podeOperar();

if (!risco.permitido) {

    console.log("");
    console.log("🛡 RISK CENTER");
    console.log("----------------------------------");
    console.log("Status : BLOQUEADO");
    console.log(`Motivo : ${risco.motivo}`);
    console.log("");

    return;

}

        console.log("");
        console.log("🚦 SIGNAL VALIDATOR");
        console.log("----------------------------------");
        console.log("Status : APROVADO");
        console.log("");

        eventBus.emit(EVENTS.EXECUTE_TRADE, signal);

    }

}

module.exports = new SignalValidator();