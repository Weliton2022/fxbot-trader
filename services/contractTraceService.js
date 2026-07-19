class ContractTraceService {

    constructor() {

        this.logs = [];

    }

    adicionar(evento, dados = {}) {

        this.logs.push({

            time: new Date(),

            evento,

            dados

        });

    }

    obter() {

        return this.logs;

    }

    limpar() {

        this.logs = [];

    }

}

module.exports = new ContractTraceService();