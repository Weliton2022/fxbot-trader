const candleEngine = require("../engine/candleEngine");
const indicatorEngine = require("../engine/indicatorEngine");
const strategyEngine = require("../engine/strategyEngine");
const signalValidator = require("../engine/signalValidator");
const executionEngine = require("../engine/executionEngine");
const proposalEngine = require("../engine/proposalEngine");
const marketDataEngine = require("../engine/marketDataEngine");
const buyEngine = require("../engine/buyEngine");
const contractMonitorEngine = require("../engine/contractMonitorEngine");
const contractResultEngine = require("../engine/contractResultEngine");
const moneyManager = require("../engine/moneyManager");
const riskManager = require("../engine/riskManager");
const platformDashboardEngine = require("../engine/platformDashboardEngine");

const marketEngine = require("../services/marketEngine");
const financialStateService = require("../services/financialStateService");

async function startup() {

    // Inicializa os Engines
    void candleEngine;
    void indicatorEngine;

    console.log("✅ IndicatorEngine carregado.");
    
    void strategyEngine;
    void signalValidator;
    void executionEngine;
    void proposalEngine;
    void marketDataEngine;
    void buyEngine;
    void contractMonitorEngine;
    void contractResultEngine;
    void moneyManager;
    void riskManager;
    void platformDashboardEngine;

    console.log("");
    console.log("====================================");
    console.log("      FXBOT PLATFORM");
    console.log("====================================");
    console.log("Core...............OK");
    console.log("Trading Engine.....OK");
    console.log("Money Manager......OK");
    console.log("");

    // Carrega estatísticas persistidas
    console.log("📊 Carregando estatísticas...");

    financialStateService.carregar();

    console.log("✅ Estatísticas carregadas.");
    console.log("");

    // Inicia o Market Engine
    await marketEngine.iniciar();

}

module.exports = startup;