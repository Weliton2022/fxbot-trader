const fs = require("fs");
const path = require("path");

const defaults = require("../config/fxbot");

const CONFIG_FILE = path.join(__dirname, "../data/config.json");

class ConfigService {

    constructor() {

        this.config = this.load();

    }

    // =====================================================
    // Carrega configuração
    // =====================================================

    load() {

        try {

            if (!fs.existsSync(CONFIG_FILE)) {

                fs.writeFileSync(
                    CONFIG_FILE,
                    JSON.stringify(defaults, null, 4)
                );

                console.log("📄 config.json criado automaticamente.");

                return structuredClone(defaults);

            }

            const json = fs.readFileSync(CONFIG_FILE, "utf8");

            const config = JSON.parse(json);

            console.log("✅ Configuração carregada do config.json");

            return config;

        } catch (err) {

            console.log("❌ Erro carregando config.json");
            console.error(err);

            return structuredClone(defaults);

        }

    }

    // =====================================================
    // Salva configuração
    // =====================================================

    save() {

        try {

            fs.writeFileSync(
                CONFIG_FILE,
                JSON.stringify(this.config, null, 4)
            );

            console.log("💾 Configuração salva.");

        } catch (err) {

            console.log("❌ Erro salvando config.json");
            console.error(err);

        }

    }

    // =====================================================
    // Configuração completa
    // =====================================================

    get() {

        return this.config;

    }

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

        this.save();

        return true;

    }

}

module.exports = new ConfigService();