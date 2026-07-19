const defaults = require("../config/fxbot");

class ConfigService {

    constructor() {

        // Carrega uma cópia das configurações padrão
        this.config = structuredClone(defaults);

    }

    // =====================================================
    // Configuração completa
    // =====================================================

    getAll() {

        return this.config;

    }

    // =====================================================
    // Mercado
    // =====================================================

    getMarket() {

        return {

            symbol: this.config.DEFAULT_SYMBOL,
            timeframe: this.config.TIMEFRAME_SECONDS,
            maxTicks: this.config.MAX_TICKS,
            maxCandles: this.config.MAX_CANDLES

        };

    }

    // =====================================================
    // Trading
    // =====================================================

    getTrading() {

        return {

            mode: this.config.MODE,
            stake: this.config.DEFAULT_STAKE,
            duration: this.config.DEFAULT_DURATION

        };

    }

    // =====================================================
    // Indicadores
    // =====================================================

    getIndicators() {

        return {

            smaFast: this.config.SMA_FAST,
            smaSlow: this.config.SMA_SLOW

        };

    }

    // =====================================================
    // Risk
    // =====================================================

    getRisk() {

        return {

            stopWin: this.config.STOP_WIN,
            stopLoss: this.config.STOP_LOSS,
            maxTrades: this.config.MAX_TRADES_PER_SESSION,
            maxLosses: this.config.MAX_CONSECUTIVE_LOSSES

        };

    }

    // =====================================================
    // Logs
    // =====================================================

    getLogs() {

        return {

            debug: this.config.DEBUG_MODE,
            console: this.config.LOG_TO_CONSOLE,
            file: this.config.LOG_TO_FILE

        };

    }

    // =====================================================
    // Atualização
    // =====================================================

    set(key, value) {

        if (!(key in this.config)) {

            return false;

        }

        this.config[key] = value;

        return true;

    }

}

module.exports = new ConfigService();