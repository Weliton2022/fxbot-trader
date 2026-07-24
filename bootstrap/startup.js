const candleEngine = require("../engine/candleEngine");
const indicatorEngine = require("../engine/indicatorEngine");
const strategyEngine = require("../engine/strategyEngine");
const signalValidator = require("../engine/signalValidator");
const executionEngine = require("../engine/executionEngine");
const proposalEngine = require("../engine/proposalEngine");
const contractRecoveryEngine = require("../engine/contractRecoveryEngine");
const marketDataEngine = require("../engine/marketDataEngine");
const buyEngine = require("../engine/buyEngine");
const contractMonitorEngine = require("../engine/contractMonitorEngine");
const contractResultEngine = require("../engine/contractResultEngine");
const contractTraceEngine = require("../engine/contractTraceEngine");
const contractsEngine = require("../engine/contractsEngine");
const moneyManager = require("../engine/moneyManager");
const riskManager = require("../engine/riskManager");
const platformDashboardEngine = require("../engine/platformDashboardEngine");
const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const diagnosticService = require("../services/diagnosticService");

const recoveryService = require("../services/recoveryService");
const contractsGateway = require("../services/contractsGateway");

const marketEngine = require("../services/marketEngine");
const financialStateService = require("../services/financialStateService");

async function startup() {

    // =====================================
    // Inicializa Engines
    // =====================================

    void candleEngine;
    void indicatorEngine;
    void strategyEngine;
    void signalValidator;
    void executionEngine;
    void proposalEngine;
    void marketDataEngine;
    void buyEngine;
    void contractMonitorEngine;
    void contractResultEngine;
    void contractTraceEngine;
    void contractsEngine;
    void moneyManager;
    void riskManager;
    void platformDashboardEngine;
    void contractRecoveryEngine;    

    diagnosticService.iniciar();

    

    // =====================================
    // Inicializa Services
    // =====================================

    void recoveryService;
    void contractsGateway;

    console.log("");
console.log("====================================");
console.log("📡 EVENTBUS DIAGNOSTIC");
console.log("====================================");

[
    EVENTS.TICK,
    EVENTS.CANDLE_CLOSED,
    EVENTS.INDICATORS_UPDATED,
    EVENTS.SIGNAL,
    EVENTS.EXECUTE_TRADE,
    EVENTS.RISK_APPROVED,
    EVENTS.PROPOSAL_MESSAGE,
    EVENTS.BUY_MESSAGE,
    EVENTS.OPEN_CONTRACT_MESSAGE
].forEach(evento => {

    console.log(
        evento.padEnd(30),
        eventBus.listenerCount(evento)
    );

});

    console.log("====================================");
    console.log("");

    console.log("");
    console.log("====================================");
    console.log("        FXBOT PLATFORM");
    console.log("====================================");
    console.log("Core....................OK");
    console.log("Trading Engine..........OK");
    console.log("Money Manager...........OK");
    console.log("Contracts Engine........OK");
    console.log("Contract Trace..........OK");
    console.log("");

    // =====================================
    // Estatísticas
    // =====================================

    console.log("📊 Carregando estatísticas...");

    financialStateService.carregar();

    console.log("✅ Estatísticas carregadas.");
    console.log("");

    // =====================================
    // Inicializa Mercado
    // =====================================

    await marketEngine.iniciar();

}

module.exports = startup;