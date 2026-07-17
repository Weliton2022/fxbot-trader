const RiskConfig = require("../models/RiskConfig");
const financialState = require("./financialStateService");
const sessionState = require("./sessionStateService");

class RiskService {

    constructor() {

        this.config = new RiskConfig();

    }

    podeOperar() {

        console.log("");
        console.log("🛡 RISK CENTER");
        console.log("----------------------------------");
        console.log("Daily Profit :", financialState.dailyProfit);
        console.log("Total Trades :", financialState.totalTrades);
        console.log("Win Streak   :", financialState.currentWinStreak);
        console.log("Loss Streak  :", financialState.currentLossStreak);
        console.log("");

        if (!this.config.enabled) {

            return { permitido: true };

        }

        if (financialState.dailyProfit >= this.config.stopWin) {

            return {

                permitido: false,

                motivo: "STOP WIN"

            };

        }

        if (sessionState.data.dailyProfit <= this.config.stopLoss) {

            return {

                permitido: false,

                motivo: "STOP LOSS"

            };

        }

        if (sessionState.data.trades >= this.config.maxTrades) {

            return {

                permitido: false,

                motivo: "LIMITE DE TRADES"

            };

        }

        if (sessionState.data.currentLossStreak >= this.config.maxLossStreak) {

            return {

                permitido: false,

                motivo: "LOSS STREAK"

            };

        }

        return {

            permitido: true

        };

    }

}

module.exports = new RiskService();