const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const sma = require("../indicators/SMA");

class IndicatorEngine {

    constructor() {

        eventBus.on(EVENTS.CANDLE_CLOSED, (candles) => {

            this.calcular(candles);

        });

    }

    calcular(candles) {

        const indicadores = {

            sma9: sma.calcular(candles, 9),
            sma21: sma.calcular(candles, 21)

        };

        console.log("");
        console.log("📊 INDICADORES");
        console.log("----------------------------------");
        console.log(`SMA 9 : ${indicadores.sma9?.toFixed(2) ?? "Aguardando..."}`);
        console.log(`SMA 21: ${indicadores.sma21?.toFixed(2) ?? "Aguardando..."}`);
        console.log("");

        eventBus.emit(EVENTS.INDICATORS_UPDATED, indicadores);

    }

}

module.exports = new IndicatorEngine();