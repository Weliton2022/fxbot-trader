const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const BrokerFactory = require("../brokers/BrokerFactory");

// Broker utilizado pela plataforma
const broker = BrokerFactory.create();

class BuyEngine {

    constructor() {

        eventBus.on(EVENTS.BUY_REQUESTED, async (dados) => {

            await this.executar(dados);

        });

    }

    async executar(dados) {

        console.log("");
        console.log("💰 BUY ENGINE");
        console.log("----------------------------------");
        console.log(`Proposal ID : ${dados.proposalId}`);
        console.log(`Preço       : ${dados.price}`);
        console.log("");

        await broker.buy(

            dados.proposalId,

            dados.price

        );

    }

}

module.exports = new BuyEngine();