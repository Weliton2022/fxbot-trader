const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");
const sessionState = require("../services/sessionStateService");
const performanceService = require("../services/performanceService");

const financialState = require("../services/financialStateService");

class MoneyManager {

    constructor() {

        eventBus.on(EVENTS.TRADE_CLOSED, (operation) => {

            this.processar(operation);

        });

    }

    processar(operation) {

console.log("");
console.log("========== MONEY MANAGER ==========");
console.log("Resultado :", operation.result);
console.log("Profit    :", operation.profit);
console.log("Status    :", operation.status);
console.log("==================================");
console.log("");

        if (!operation) {

            console.log("");
            console.log("⚠ MONEY MANAGER");
            console.log("----------------------------------");
            console.log("Operação inválida.");
            console.log("");

            return;

        }

        financialState.registrarResultado(operation);
        
        sessionState.registrarResultado(operation);

        performanceService.atualizar(financialState);

        console.log("");
        console.log("==================================");
        console.log("💰 MONEY MANAGER");
        console.log("==================================");
        console.log(`Operation    : ${operation.id}`);
        console.log(`Resultado    : ${operation.result}`);
        console.log(`Lucro        : ${this.money(operation.profit)}`);
        console.log("----------------------------------");
        console.log(`Trades       : ${financialState.totalTrades}`);
        console.log(`Wins         : ${financialState.wins}`);
        console.log(`Losses       : ${financialState.losses}`);
        console.log(`Win Streak   : ${financialState.currentWinStreak}`);
        console.log(`Loss Streak  : ${financialState.currentLossStreak}`);
        console.log(`Lucro Total  : ${this.money(financialState.totalProfit)}`);
        console.log(`Lucro Diário : ${this.money(financialState.dailyProfit)}`);
        console.log("");

    }

    money(value) {

        return Number(value).toFixed(2);

    }

}

module.exports = new MoneyManager();