const Broker = require("../brokers/Broker");

const websocketService = require("../services/websocketService");
const proposalService = require("../services/proposalService");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

class DerivGateway extends Broker {

    async conectar() {

        console.log("🏦 Deriv Gateway conectado.");

        return true;

    }

    async proposal(request) {

        console.log("");
        console.log("🚀 DERIV GATEWAY");
        console.log("----------------------------------");
        console.log("Enviando Proposal...");
        console.log("");

        const proposal = proposalService.criar(request);

        fxbotState.setState(STATES.WAITING_PROPOSAL);

        websocketService.enviar(proposal);

    }

    async buy(proposalId, price) {

        console.log("");
        console.log("🚀 DERIV GATEWAY");
        console.log("----------------------------------");
        console.log("Enviando BUY...");
        console.log("");

        fxbotState.setState(STATES.BUYING);

        websocketService.enviar({

            buy: proposalId,

            price

        });

    }

    async balance() {

        websocketService.enviar({

            balance: 1

        });

    }

}

module.exports = new DerivGateway();