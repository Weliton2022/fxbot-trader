const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const derivBroker = require("../services/derivBroker");

const ExecutionRequest = require("../models/ExecutionRequest");

const config = require("../config/fxbot");
const marketService = require("../services/marketService");

class ExecutionEngine {

    constructor() {

        eventBus.on(EVENTS.EXECUTE_TRADE, async (signal) => {

            await this.executar(signal);

        });

    }

    async executar(signal) {

        const ativo = marketService.getAtivoAtual();

        const request = new ExecutionRequest({

            signal,

            symbol: ativo.underlying_symbol,

            stake: config.DEFAULT_STAKE,

            duration: config.DEFAULT_DURATION,

            contractType:

                signal.isBuy()

                    ? "CALL"

                    : "PUT"

        });

        console.log("");
        console.log("⚙️ EXECUTION ENGINE");
        console.log("----------------------------------");
        console.log(`Ativo      : ${request.symbol}`);
        console.log(`Contrato   : ${request.contractType}`);
        console.log(`Stake      : ${request.stake}`);
        console.log(`Duração    : ${request.duration}`);
        console.log("");

        await derivBroker.proposal(request);

    }

}

module.exports = new ExecutionEngine();