const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const DashboardSnapshot = require("../models/DashboardSnapshot");

const dashboardService = require("../services/dashboardService");
const platformStateService = require("../services/platformStateService");

class PlatformDashboardEngine {

    constructor() {

        eventBus.on(EVENTS.TRADE_OPENED, () => this.atualizar());

        eventBus.on(EVENTS.TRADE_CLOSED, () => this.atualizar());

        eventBus.on(EVENTS.INDICATORS_UPDATED, () => this.atualizar());

    }

    atualizar() {

        const state = platformStateService.get();

        const snapshot = new DashboardSnapshot({

            botState: state.bot.state,

            operation: state.operation,

            financial: state.financial,

            session: state.financial.session ?? {},

            lifecycle: state.lifecycle,

            market: state.market.active,

            strategy: "MovingAverageCross",

            broker: "Deriv Demo"

        });

        dashboardService.atualizar(snapshot);

        this.render(snapshot);

    }

    render(snapshot) {

        console.log("");
        console.log("====================================================");
        console.log("              FXBOT PLATFORM");
        console.log("====================================================");
        console.log("");

        console.log("🤖 BOT");
        console.log("----------------------------------------------------");
        console.log(`Estado...........: ${snapshot.botState}`);
        console.log(`Lifecycle........: ${snapshot.lifecycle?.stage ?? "IDLE"}`);
        console.log(`Versão...........: ${snapshot.version}`);
        console.log(`Atualizado.......: ${snapshot.timestamp.toLocaleTimeString()}`);
        console.log(`Ativo............: ${snapshot.market?.underlying_symbol ?? "---"}`);
        console.log(`Estratégia.......: ${snapshot.strategy}`);
        console.log(`Broker...........: ${snapshot.broker}`);
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
        console.log(`Trades Total.....: ${snapshot.financial.totalTrades}`);
        console.log(`Wins.............: ${snapshot.financial.wins}`);
        console.log(`Losses...........: ${snapshot.financial.losses}`);
        console.log(`Lucro Total......: ${Number(snapshot.financial.totalProfit).toFixed(2)}`);
        console.log(`Lucro Diário.....: ${Number(snapshot.financial.dailyProfit).toFixed(2)}`);

        console.log("");

        console.log("📊 SESSÃO");
        console.log("----------------------------------------------------");
        console.log(`Trades Sessão....: ${snapshot.session?.trades ?? 0}`);
        console.log(`Wins Sessão......: ${snapshot.session?.wins ?? 0}`);
        console.log(`Losses Sessão....: ${snapshot.session?.losses ?? 0}`);
        console.log(`Lucro Sessão.....: ${Number(snapshot.session?.totalProfit ?? 0).toFixed(2)}`);

        console.log("");
        console.log("====================================================");
        console.log("");

    }

}

module.exports = new PlatformDashboardEngine();