const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const movingAverageCross = require("../strategies/MovingAverageCross");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

class StrategyEngine {

    constructor() {

        eventBus.on(EVENTS.INDICATORS_UPDATED, (indicadores) => {

            this.analisar(indicadores);

        });

    }

    analisar(indicadores) {

        console.log("");
        console.log("########################################");
        console.log("######## STRATEGY ENGINE V2 ########");
        console.log("########################################");
        console.log("");

        console.log("🔥 StrategyEngine.analisar() foi chamado.");

        // ======================================
        // Robô pausado
        // ======================================

        if (fxbotState.is(STATES.PAUSED)) {

            console.log("");
            console.log("⏸ FXBOT PAUSADO");
            console.log("----------------------------------");
            console.log("Análise ignorada.");
            console.log("");

            return;

        }

        // ======================================
        // Executa a estratégia
        // ======================================

        const signal = movingAverageCross.analisar(indicadores);

        console.log("");
        console.log("🧠 STRATEGY ENGINE");
        console.log("----------------------------------");
        console.log(`Sinal      : ${signal.signal}`);
        console.log(`Confiança  : ${signal.confidence}%`);
        console.log(`Estratégia : ${signal.strategy}`);
        console.log(`Motivo     : ${signal.reason}`);
        console.log("");

        console.log("🔵 PASSO 1");
        console.log("Emitindo SIGNAL...");
        console.log(signal);
        console.log("");
        console.log("");
        console.log("========================================");
        console.log("🚦 SIGNAL EMITIDO");
        console.log("Sinal.....:", signal.signal);
        console.log("Estratégia:", signal.strategy);
        console.log("Hora......:", Date.now());
        console.log("Estado....:", fxbotState.getState());
        console.log("========================================");
        console.log("");

        eventBus.emit(EVENTS.SIGNAL, signal);

        console.log("✅ SIGNAL emitido.");
        console.log("");

        return signal;

    }

}

module.exports = new StrategyEngine();