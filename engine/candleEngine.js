const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const Candle = require("../models/Candle");
const config = require("../config/fxbot");

class CandleEngine {

    constructor() {

        this.candles = [];
        this.candleAtual = null;

        eventBus.on(EVENTS.TICK, (tick) => {

            this.adicionarTick(tick);

        });

    }

    adicionarTick(tick) {

        const periodo = Math.floor(
            tick.epoch / config.TIMEFRAME_SECONDS
        );

        // Primeiro candle
        if (!this.candleAtual) {

            this.candleAtual = new Candle(
                tick.quote,
                tick.epoch
            );

            this.candleAtual.periodo = periodo;

            return;

        }

        // Continua no mesmo candle
        if (this.candleAtual.periodo === periodo) {

            this.candleAtual.atualizar(
                tick.quote,
                tick.epoch
            );

            return;

        }

        // Fecha o candle
        this.candles.push(this.candleAtual);

        console.log(`📚 Total de candles armazenados: ${this.candles.length}`);

        if (this.candles.length > config.MAX_CANDLES) {

            this.candles.shift();

        }

        console.log("");
        console.log("==================================");
        console.log("🕯️ NOVO CANDLE");
        console.log("==================================");
        console.log(`Open : ${this.candleAtual.open}`);
        console.log(`High : ${this.candleAtual.high}`);
        console.log(`Low  : ${this.candleAtual.low}`);
        console.log(`Close: ${this.candleAtual.close}`);
        console.log(`Ticks: ${this.candleAtual.ticks}`);
        console.log("");

        eventBus.emit(EVENTS.CANDLE_CLOSED, this.candles);

        // Novo candle
        this.candleAtual = new Candle(
            tick.quote,
            tick.epoch
        );

        this.candleAtual.periodo = periodo;

    }

    getCandles() {

        return this.candles;

    }

    getUltimoCandle() {

        return this.candleAtual;

    }

}

module.exports = new CandleEngine();