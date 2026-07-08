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

            return;

        }

        console.log(`ID       : ${mensagem.proposal.id}`);
        console.log(`Ask Price: ${mensagem.proposal.ask_price}`);
        console.log(`Payout   : ${mensagem.proposal.payout}`);
        console.log(`Spot     : ${mensagem.proposal.spot}`);

        console.log("");

    }

}

module.exports = new ProposalEngine();