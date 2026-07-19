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
console.log("Financial Daily Profit :", financialState.dailyProfit);
console.log("Financial Trades       :", financialState.totalTrades);
console.log("Financial Win Streak   :", financialState.currentWinStreak);
console.log("Financial Loss Streak  :", financialState.currentLossStreak);
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

console.log("");
console.log("===== DEBUG RISK =====");
console.log("Daily Profit :", sessionState.data.dailyProfit);
console.log("Trades       :", sessionState.data.trades);
console.log("Win Streak   :", sessionState.data.currentWinStreak);
console.log("Loss Streak  :", sessionState.data.currentLossStreak);
console.log("Max Trades   :", this.config.maxTrades);
console.log("Max Loss     :", this.config.maxLossStreak);
console.log("======================");
console.log("");

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