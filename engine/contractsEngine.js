const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const contractsService = require("../services/contractsService");

class ContractsEngine {

    constructor() {

        eventBus.on(EVENTS.CONTRACTS_FOR_MESSAGE, (mensagem) => {

            this.processar(mensagem);

        });

    }

    processar(mensagem) {

        if (!mensagem.contracts_for) {

            console.log("");
            console.log("⚠ CONTRACTS ENGINE");
            console.log("----------------------------------");
            console.log("Nenhum contrato recebido.");
            console.log("");

            return;

        }

        const contratos = mensagem.contracts_for.available || [];

        contractsService.atualizar(contratos);

        console.log("");
        console.log("📑 CONTRACTS ENGINE");
        console.log("----------------------------------");
        console.log(`Contratos carregados: ${contratos.length}`);
        console.log("");

    }

}

module.exports = new ContractsEngine();