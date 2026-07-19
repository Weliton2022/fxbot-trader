class ContractsService {

    constructor() {

        this.contracts = [];

    }

    atualizar(lista) {

        this.contracts = lista;

    }

    obterTodos() {

        return this.contracts;

    }

    obterPorTipo(tipo) {

        return this.contracts.filter(

            contrato => contrato.contract_type === tipo

        );

    }

    limpar() {

        this.contracts = [];

    }

}

module.exports = new ContractsService();