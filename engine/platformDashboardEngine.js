const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const DashboardSnapshot = require("../models/DashboardSnapshot");

const dashboardService = require("../services/dashboardService");
const fxbotState = require("../services/fxbotStateService");
const financialState = require("../services/financialStateService");
const operationManager = require("../services/operationManager");
const marketService = require("../services/marketService");

class PlatformDashboardEngine {

    constructor() {

        eventBus.on(EVENTS.TRADE_OPENED, () => {

            this.atualizar();

        });

        eventBus.on(EVENTS.TRADE_CLOSED, () => {

            this.atualizar();

        });

        eventBus.on(EVENTS.INDICATORS_UPDATED, () => {

            this.atualizar();

        });

    }

    atualizar() {

        const snapshot = new DashboardSnapshot({

    botState: fxbotState.getState(),

    operation: operationManager.obterAtual(),

    financial: financialState.data,

    market: marketService.getAtivoAtual(),

    strategy: "MovingAverageCross",

    broker: "Deriv Demo"

});

        dashboardService.atualizar(snapshot);

        this.render(snapshot);

    }

    render(snapshot) {

        console.clear();

        console.log("");
        console.log("====================================================");
        console.log("              FXBOT PLATFORM");
        console.log("====================================================");
        console.log("");

        console.log("🤖 BOT");
        console.log("----------------------------------------------------");
        console.log(`Estado...........: ${snapshot.botState}`);
        console.log(`Versão...........: ${snapshot.version}`);
        console.log(`Atualizado.......: ${snapshot.timestamp.toLocaleTimeString()}`);
        console.log(`Ativo............: ${snapshot.market?.underlying_symbol ?? "---"}`);
        console.log("");

        console.log("📈 OPERAÇÃO");
        console.log("----------------------------------------------------");

        if (snapshot.operation) {

            console.log(`ID...............: ${snapshot.operation.id}`);
            console.log(`Direção..........: ${snapshot.operation.direction}`);
            console.log(`Stake............: ${snapshot.operation.stake}`);
            console.log(`Status...........: ${snapshot.operation.status}`);

        } else {

            console.log("Nenhuma operação ativa.");

        }

        console.log("");

        console.log("💰 FINANCEIRO");
        console.log("----------------------------------------------------");
        console.log(`Trades...........: ${snapshot.financial.totalTrades}`);
        console.log(`Wins.............: ${snapshot.financial.wins}`);
        console.log(`Losses...........: ${snapshot.financial.losses}`);
        console.log(`Lucro Total......: ${snapshot.financial.totalProfit.toFixed(2)}`);
        console.log(`Lucro Diário.....: ${snapshot.financial.dailyProfit.toFixed(2)}`);

        console.log("");
        console.log("====================================================");
        console.log("");

    }

}

module.exports = new PlatformDashboardEngine();