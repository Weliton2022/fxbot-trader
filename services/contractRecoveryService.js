class ContractRecoveryService {

    constructor() {

        this.timers = new Map();

    }

    iniciar(contractId, tempoMs, callback) {

        this.cancelar(contractId);

        const timer = setTimeout(() => {

            this.timers.delete(contractId);

            callback();

        }, tempoMs);

        this.timers.set(contractId, timer);

    }

    cancelar(contractId) {

        if (!this.timers.has(contractId)) {

            return;

        }

        clearTimeout(this.timers.get(contractId));

        this.timers.delete(contractId);

    }

}

module.exports = new ContractRecoveryService();