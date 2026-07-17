const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const financialState = require("../services/financialStateService");
const config = require("../config/fxbot");

class RiskManager {

    constructor() {

        eventBus.on(EVENTS.EXECUTE_TRADE, (signal) => {

            this.validar(signal);

        });

    }

    validar(signal) {

        // ===============================
        // STOP WIN
        // ===============================

        if (financialState.dailyProfit >= config.STOP_WIN) {

            financialState.stopWinReached = true;

        }

        if (financialState.stopWinReached) {

            console.log("");
            console.log("🛑 RISK MANAGER");
            console.log("----------------------------------");
            console.log("Status : BLOQUEADO");
            console.log(`Motivo : STOP WIN atingido (${financialState.dailyProfit.toFixed(2)} USD)`);
            console.log("");

            return;

        }

        // ===============================
        // STOP LOSS
        // ===============================

        if (financialState.dailyProfit <= config.STOP_LOSS) {

            financialState.stopLossReached = true;

        }

        if (financialState.stopLossReached) {

            console.log("");
            console.log("🛑 RISK MANAGER");
            console.log("----------------------------------");
            console.log("Status : BLOQUEADO");
            console.log(`Motivo : STOP LOSS atingido (${financialState.dailyProfit.toFixed(2)} USD)`);
            console.log("");

            return;

        }

        // ===============================
        // LIMITE DE TRADES
        // ===============================

        if (financialState.totalTrades >= config.MAX_TRADES_PER_SESSION) {

            console.log("");
            console.log("🛑 RISK MANAGER");
            console.log("----------------------------------");
            console.log("Status : BLOQUEADO");
            console.log("Motivo : Limite de operações atingido.");
            console.log("");

            return;

        }

        // ===============================
        // SEQUÊNCIA DE LOSSES
        // ===============================

        if (
            financialState.currentLossStreak >=
            config.MAX_CONSECUTIVE_LOSSES
        ) {

            console.log("");
            console.log("🛑 RISK MANAGER");
            console.log("----------------------------------");
            console.log("Status : BLOQUEADO");
            console.log("Motivo : Sequência máxima de perdas atingida.");
            console.log("");

            return;

        }

        // ===============================
        // APROVADO
        // ===============================

        console.log("");
        console.log("🛡️ RISK MANAGER");
        console.log("----------------------------------");
        console.log("Status : APROVADO");
        console.log("");

        eventBus.emit(EVENTS.RISK_APPROVED, signal);

    }

}

module.exports = new RiskManager();