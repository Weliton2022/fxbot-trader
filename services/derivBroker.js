const BrokerService = require("./brokerService");
const websocketService = require("./websocketService");
const proposalService = require("./proposalService");

class DerivBroker extends BrokerService {

    async conectar() {

        console.log("🏦 Deriv Broker conectado.");

        return true;

    }

    async proposal(request) {

        const proposal = proposalService.criar(request);

        console.log("");
        console.log("📄 ENVIANDO PROPOSAL");
        console.log("----------------------------------");
        console.log(proposal);
        console.log("");

        websocketService.enviar(proposal);

    }

    async buy(proposalId, price) {

        websocketService.enviar({

            buy: proposalId,

            price

        });

    }

}

module.exports = new DerivBroker();