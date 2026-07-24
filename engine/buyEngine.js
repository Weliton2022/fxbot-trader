const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const BrokerFactory = require("../brokers/BrokerFactory");
const riskManagerService = require("../services/riskManagerService");
const tradeLifecycle = require("../services/tradeLifecycleService");

// Broker utilizado pela plataforma
const broker = BrokerFactory.create();

class BuyEngine {

    constructor() {

        eventBus.on(EVENTS.BUY_REQUESTED, async (dados) => {

            await this.executar(dados);

        });

    }

    async executar(dados) {

        const risk = riskManagerService.analisar();

        if (!risk.allowed) {

            console.log("");
            console.log("🛑 RISK MANAGER");
            console.log("----------------------------------");
            console.log("Operação BLOQUEADA");
            console.log(`Motivo: ${risk.reason}`);
            console.log("");

            return;

        }

        // ======================================
        // Trade Lifecycle
        // ======================================

        tradeLifecycle.data.buySentAt = new Date();

        tradeLifecycle.stage("BUY_SENT");

        console.log("➡️ Entrou no BuyEngine");
        console.log("");
        console.log("💰 BUY ENGINE");
        console.log("----------------------------------");
        console.log(`Proposal ID : ${dados.proposalId}`);
        console.log(`Preço       : ${dados.price}`);
        console.log("");
        console.log("🔴 BUY");
        console.log("Proposal:", dados.proposalId);
        console.log("TIME:", Date.now());

        await broker.buy(

            dados.proposalId,

            dados.price

        );

    }

}

module.exports = new BuyEngine();