const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class DiagnosticService {

    constructor() {

        this.started = false;
        this.sequence = 0;

    }

    iniciar() {

        if (this.started) {
            return;
        }

        this.started = true;

        console.log("");
        console.log("========================================================");
        console.log("🔬 FXBOT EVENT TRACE");
        console.log("========================================================");
        console.log("");

        const eventos = [

            EVENTS.CONNECTION_OPEN,
            EVENTS.CONNECTION_CLOSED,

            EVENTS.TICK_MESSAGE,
            EVENTS.TICK,

            EVENTS.CANDLE_CLOSED,
            EVENTS.INDICATORS_UPDATED,

            EVENTS.SIGNAL,
            EVENTS.EXECUTE_TRADE,
            EVENTS.RISK_APPROVED,

            EVENTS.PROPOSAL_MESSAGE,
            EVENTS.BUY_MESSAGE,
            EVENTS.OPEN_CONTRACT_MESSAGE,
            EVENTS.FORGET_MESSAGE

        ];

        eventos.forEach(evento => {

            eventBus.on(evento, () => {

                this.sequence++;

                const agora = new Date();

                const hora =
                    agora.toLocaleTimeString("pt-BR", {
                        hour12: false
                    }) +
                    "." +
                    agora.getMilliseconds().toString().padStart(3, "0");

                console.log(
                    `[${String(this.sequence).padStart(4, "0")}] ${hora} -> ${evento}`
                );

            });

        });

    }

}

module.exports = new DiagnosticService();