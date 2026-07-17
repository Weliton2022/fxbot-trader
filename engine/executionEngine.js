const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const derivBroker = require("../services/derivBroker");
const operationManager = require("../services/operationManager");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

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

        const operation = operationManager.criar({

            symbol: ativo.underlying_symbol,

            direction: signal.isBuy() ? "CALL" : "PUT",

            strategy: signal.strategy || "Default Strategy",

            stake: config.DEFAULT_STAKE

        });

        const request = new ExecutionRequest({

            signal,

            symbol: operation.symbol,

            stake: operation.stake,

            duration: config.DEFAULT_DURATION,

            contractType: operation.direction

        });

        console.log("");
        console.log("⚙️ EXECUTION ENGINE");
        console.log("----------------------------------");
        console.log(`Operation  : ${operation.id}`);
        console.log(`Ativo      : ${request.symbol}`);
        console.log(`Contrato   : ${request.contractType}`);
        console.log(`Stake      : ${request.stake}`);
        console.log(`Duração    : ${request.duration}`);
        console.log("");

        // Atualiza o estado da plataforma
        fxbotState.setState(STATES.WAITING_PROPOSAL);

        await derivBroker.proposal(request);

    }

}

module.exports = new ExecutionEngine();