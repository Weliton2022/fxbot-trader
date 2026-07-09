const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const tradeState = require("../services/tradeStateService");

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

        if (tradeState.estaOperando()) {

            console.log("");
            console.log("🚫 TRADE MANAGER");
            console.log("----------------------------------");
            console.log("Status : Ignorado");
            console.log("Motivo : Já existe uma operação aberta.");
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