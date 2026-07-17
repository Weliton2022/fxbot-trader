const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const sma = require("../indicators/SMA");
const config = require("../config/fxbot");

class IndicatorEngine {

    constructor() {

        console.log("✅ Constructor do IndicatorEngine executado.");

        eventBus.on(EVENTS.CANDLE_CLOSED, (candles) => {

            this.calcular(candles);

        });

    }

    calcular(candles) {

        console.log("🔥 IndicatorEngine recebeu CANDLE_CLOSED");

        const indicadores = {

            smaFast: sma.calcular(candles, config.SMA_FAST),

            smaSlow: sma.calcular(candles, config.SMA_SLOW)

        };

        console.log("");
        console.log("📊 INDICADORES");
        console.log("----------------------------------");
        console.log(`SMA ${config.SMA_FAST}: ${indicadores.smaFast?.toFixed(2) ?? "Aguardando..."}`);
        console.log(`SMA ${config.SMA_SLOW}: ${indicadores.smaSlow?.toFixed(2) ?? "Aguardando..."}`);
        console.log("");

        eventBus.emit(EVENTS.INDICATORS_UPDATED, indicadores);

    }

}

module.exports = new IndicatorEngine();