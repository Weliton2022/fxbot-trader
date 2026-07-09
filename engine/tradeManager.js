const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const tradeState = require("../services/tradeStateService");

class TradeManager {

    constructor() {

        eventBus.on(EVENTS.TRADE_OPENED, () => {

            tradeState.iniciarOperacao();

        });

        eventBus.on(EVENTS.TRADE_CLOSED, () => {

            tradeState.finalizarOperacao();

        });

    }

}

module.exports = new TradeManager();