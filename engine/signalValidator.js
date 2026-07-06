const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

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

        console.log("");
        console.log("🚦 SIGNAL VALIDATOR");
        console.log("----------------------------------");
        console.log("Status : APROVADO");
        console.log("");

        eventBus.emit(EVENTS.TRADE_OPENED, signal);

    }

}

module.exports = new SignalValidator();