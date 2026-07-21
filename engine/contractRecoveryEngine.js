const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const websocketService = require("../services/websocketService");
const contractRecoveryService = require("../services/contractRecoveryService");

class ContractRecoveryEngine {

    constructor() {

        eventBus.on(EVENTS.BUY_MESSAGE, (mensagem) => {

            this.agendarRecuperacao(mensagem);

        });

        eventBus.on(EVENTS.TRADE_CLOSED, (operation) => {

            if (operation && operation.contractId) {

                contractRecoveryService.cancelar(operation.contractId);

            }

        });

    }

    agendarRecuperacao(mensagem) {

        if (!mensagem.buy) {

            return;

        }

        const contractId = mensagem.buy.contract_id;

        console.log("");
        console.log("🛟 CONTRACT RECOVERY");
        console.log("----------------------------------");
        console.log(`Contrato : ${contractId}`);
        console.log("Recuperação agendada para 7 segundos.");
        console.log("");

        contractRecoveryService.iniciar(

            contractId,

            7000,

            () => this.recuperar(contractId)

        );

    }

    recuperar(contractId) {

        console.log("");
        console.log("🛟 CONTRACT RECOVERY");
        console.log("----------------------------------");
        console.log(`Consultando contrato ${contractId}`);
        console.log("");

        websocketService.enviar({

            proposal_open_contract: 1,

            contract_id: contractId

        });

    }

}

module.exports = new ContractRecoveryEngine();