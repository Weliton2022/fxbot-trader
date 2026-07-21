const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const derivBroker = require("../services/derivBroker");
const operationManager = require("../services/operationManager");

const botControl = require("../services/botControlService");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

const ExecutionRequest = require("../models/ExecutionRequest");

const configService = require("../services/configService");
const marketService = require("../services/marketService");
const tradeLifecycle = require("../services/tradeLifecycleService");

class ExecutionEngine {

    constructor() {

        eventBus.on(EVENTS.RISK_APPROVED, async (signal) => {

            await this.executar(signal);

        });

    }

    async executar(signal) {

        // ======================================
        // BOT PAUSADO
        // ======================================

        if (!botControl.isRunning()) {

            console.log("");
            console.log("⏸ EXECUTION ENGINE");
            console.log("----------------------------------");
            console.log("Bot pausado.");
            console.log("Execução ignorada.");
            console.log("");

            return;

        }

        const ativo = marketService.getAtivoAtual();

        const trading = configService.getTrading();

        const operation = operationManager.criar({

            symbol: ativo.underlying_symbol,

            direction: signal.isBuy() ? "CALL" : "PUT",

            strategy: signal.strategy || "Default Strategy",

            stake: trading.stake

        });

        tradeLifecycle.data.operationId = operation.id;
        tradeLifecycle.data.createdAt = new Date();
        tradeLifecycle.stage("CREATED");

        const request = new ExecutionRequest({

            signal,

            symbol: operation.symbol,

            stake: operation.stake,

            duration: trading.duration,

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

        fxbotState.setState(STATES.WAITING_PROPOSAL);

        await derivBroker.proposal(request);

    }

}

module.exports = new ExecutionEngine();