const crypto = require("crypto");

class Operation {

    constructor(data = {}) {

        // ======================================
        // Identificação
        // ======================================

        this.id = crypto.randomUUID();

        // ======================================
        // Estratégia
        // ======================================

        this.strategy = data.strategy || null;
        this.signal = data.signal || null;

        // ======================================
        // Mercado
        // ======================================

        this.symbol = data.symbol || null;
        this.direction = data.direction || null;

        // ======================================
        // Financeiro
        // ======================================

        this.stake = data.stake || 0;
        this.buyPrice = null;
        this.payout = null;
        this.profit = 0;

        // ======================================
        // Proposal
        // ======================================

        this.proposalId = null;

        // ======================================
        // Contrato
        // ======================================

        this.contractId = data.contractId || null;

        // ======================================
        // Mercado (Spots)
        // ======================================

        this.entrySpot = null;
        this.exitSpot = null;

        // ======================================
        // Tempo
        // ======================================

        this.createdAt = new Date();
        this.openedAt = null;
        this.closedAt = null;

        // ======================================
        // Resultado
        // ======================================

        this.status = "CREATED";
        this.result = null;

        // ======================================
        // CONTROLES INTERNOS
        // ======================================

        this.buyRequested = false;
        this.buyCompleted = false;
        this.contractOpened = false;
        this.contractClosed = false;
        this.proposalReceived = false;

    }

    proposal(proposal) {

        this.proposalReceived = true;

        this.proposalId = proposal.id;
        this.buyPrice = Number(proposal.ask_price);
        this.payout = Number(proposal.payout);

    }

    opened(contractId) {

        this.contractOpened = true;

        this.contractId = contractId;

        this.status = "OPEN";

        this.openedAt = new Date();

    }

    settlement(data = {}) {

        this.entrySpot = data.entrySpot ?? this.entrySpot;
        this.exitSpot = data.exitSpot ?? this.exitSpot;

    }

    closed(result, profit) {

        this.contractClosed = true;

        this.status = "CLOSED";

        this.closedAt = new Date();

        this.result = result;

        this.profit = Number(profit);

    }

}

module.exports = Operation;