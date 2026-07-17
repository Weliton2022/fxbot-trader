const Operation = require("../models/Operation");

class OperationManager {

    constructor() {

        this.currentOperation = null;

    }

    criar(data = {}) {

        this.currentOperation = new Operation(data);

        return this.currentOperation;

    }

    obterAtual() {

        return this.currentOperation;

    }

    existeOperacao() {

        return this.currentOperation !== null;

    }

    abrir(contractId) {

        if (!this.currentOperation) {

            return;

        }

        this.currentOperation.opened(contractId);

    }

    fechar(status, profit) {

        if (!this.currentOperation) {

            return;

        }

        this.currentOperation.closed(

            status,

            profit

        );

    }

    limpar() {

        this.currentOperation = null;

    }

}

module.exports = new OperationManager();