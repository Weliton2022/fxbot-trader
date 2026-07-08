const BrokerService = require("./brokerService");
const websocketService = require("./websocketService");
const proposalService = require("./proposalService");

class DerivBroker extends BrokerService {

    async conectar() {

        console.log("🏦 Deriv Broker conectado.");

        return true;

    }

    async proposal(request) {

        console.log("");
        console.log("🚀 DerivBroker.proposal() foi chamado.");
        console.log("");

        const proposal = proposalService.criar(request);

        console.log("");
        console.log("📄 ENVIANDO PROPOSAL");
        console.log("----------------------------------");
        console.log(JSON.stringify(proposal, null, 2));
        console.log("");

        websocketService.enviar(proposal);

        console.log("");
        console.log("✅ Proposal enviada ao WebSocket.");
        console.log("");

    }

    async buy(proposalId, price) {

    console.log("");
    console.log("🚀 ENVIANDO BUY PARA DERIV");
    console.log("----------------------------------");
    console.log(`Proposal ID : ${proposalId}`);
    console.log(`Preço Máximo: ${price}`);
    console.log("");

    websocketService.enviar({

        buy: proposalId,

        price

    });

}

}

module.exports = new DerivBroker();