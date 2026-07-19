const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const tradeLifecycle = require("../services/tradeLifecycleService");
const operationManager = require("../services/operationManager");

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

        // ======================================
        // Trade Lifecycle
        // ======================================

        tradeLifecycle.data.proposalReceivedAt = new Date();

        tradeLifecycle.stage("PROPOSAL_RECEIVED");

        console.log(`ID         : ${proposal.id}`);
        console.log(`Ask Price  : ${proposal.ask_price}`);
        console.log(`Payout     : ${proposal.payout}`);
        console.log(`Spot       : ${proposal.spot}`);
        console.log("");

        // Atualiza a Operation atual

        const operation = operationManager.obterAtual();

        if (operation) {

            operation.proposal(proposal);

            console.log("➡️ Entrou no ProposalEngine");
            console.log("📝 OPERATION");
            console.log("----------------------------------");
            console.log("Proposal vinculada à operação.");
            console.log(`Operation  : ${operation.id}`);
            console.log(`Proposal   : ${operation.proposalId}`);
            console.log("");

        }

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