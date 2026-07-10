class ContractRegistry {

    constructor() {

        this.reset();

    }

    registrar(dados) {

        this.contractId = dados.contractId;
        this.subscriptionId = dados.subscriptionId;
        this.status = "OPEN";
        this.buyPrice = dados.buyPrice ?? null;
        this.symbol = dados.symbol ?? null;
        this.contractType = dados.contractType ?? null;

    }

    finalizar(status, profit) {

        this.status = status;
        this.profit = profit;

    }

    reset() {

        this.contractId = null;
        this.subscriptionId = null;
        this.status = "IDLE";
        this.buyPrice = null;
        this.symbol = null;
        this.contractType = null;
        this.profit = null;

    }

    getContractId() {

        return this.contractId;

    }

    getSubscriptionId() {

        return this.subscriptionId;

    }

    possuiContratoAberto() {

        return this.contractId !== null;

    }

}

module.exports = new ContractRegistry();