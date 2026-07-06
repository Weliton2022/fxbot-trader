const candleEngine = require("../engine/candleEngine");
const indicatorEngine = require("../engine/indicatorEngine");
const strategyEngine = require("../engine/strategyEngine");
const signalValidator = require("../engine/signalValidator");
const executionEngine = require("../engine/executionEngine");

const marketEngine = require("../services/marketEngine");

async function startup() {

    void candleEngine;
    void indicatorEngine;
    void strategyEngine;
    void signalValidator;
    void executionEngine;

    console.log("");
    console.log("====================================");
    console.log("      FXBOT TRADER");
    console.log("====================================");
    console.log("");

    await marketEngine.iniciar();

}

module.exports = startup;