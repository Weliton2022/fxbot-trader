const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class ProposalEngine {

    constructor() {

        eventBus.on(EVENTS.PROPOSAL_MESSAGE, (mensagem) => {

            this.processar(mensagem);

        });

    }

    processar(mensagem) {

        console.log("");
        console.log("📨 PROPOSAL RECEBIDA");
        console.log("----------------------------------");

        if (mensagem.error) {

            console.log("Erro:");
            console.log(mensagem.error.message);
            console.log("");

            return;

        }

        const proposal = mensagem.proposal;

        console.log(`ID       : ${proposal.id}`);
        console.log(`Ask Price: ${proposal.ask_price}`);
        console.log(`Payout   : ${proposal.payout}`);
        console.log(`Spot     : ${proposal.spot}`);
        console.log("");

        console.log("📢 Disparando BUY_REQUESTED...");
        console.log("");

        eventBus.emit(EVENTS.BUY_REQUESTED, {

            proposalId: proposal.id,

            price: proposal.ask_price,

            proposal

        });

    }

}

module.exports = new ProposalEngine();