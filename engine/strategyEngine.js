const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const movingAverageCross = require("../strategies/MovingAverageCross");

class StrategyEngine {

    constructor() {

        eventBus.on(EVENTS.INDICATORS_UPDATED, (indicadores) => {

            this.analisar(indicadores);

        });

    }

    analisar(indicadores) {

        const signal = movingAverageCross.analisar(indicadores);

        console.log("");
        console.log("🧠 STRATEGY ENGINE");
        console.log("----------------------------------");
        console.log(`Sinal      : ${signal.signal}`);
        console.log(`Confiança  : ${signal.confidence}%`);
        console.log(`Estratégia : ${signal.strategy}`);
        console.log(`Motivo     : ${signal.reason}`);
        console.log("");

        eventBus.emit(EVENTS.SIGNAL, signal);

        return signal;

    }

}

module.exports = new StrategyEngine();