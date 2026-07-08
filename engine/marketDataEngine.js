const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class MarketDataEngine {

    constructor() {

        eventBus.on(EVENTS.HISTORY_MESSAGE, (mensagem) => {

            this.processarHistorico(mensagem);

        });

    }

    processarHistorico(mensagem) {

        console.log("");
        console.log("📚 MARKET DATA ENGINE");
        console.log("----------------------------------");
        console.log("Histórico recebido.");
        console.log("");

        // Nas próximas Sprints iremos
        // transformar esse histórico
        // em candles reais.

    }

}

module.exports = new MarketDataEngine();