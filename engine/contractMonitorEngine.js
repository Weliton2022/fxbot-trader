const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const websocketService = require("../services/websocketService");
const operationManager = require("../services/operationManager");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

class ContractMonitorEngine {

    constructor() {

        eventBus.on(EVENTS.BUY_MESSAGE, (mensagem) => {

            this.monitorar(mensagem);

        });

    }

    monitorar(mensagem) {

        if (!mensagem.buy) {

            return;

        }

        const contractId = mensagem.buy.contract_id;

        // Marca a operação como oficialmente aberta
        operationManager.abrir(contractId);

        // Atualiza o estado da plataforma
        fxbotState.setState(STATES.OPERATING);

        console.log("");
        console.log("📡 CONTRACT MONITOR");
        console.log("----------------------------------");
        console.log(`Contrato : ${contractId}`);
        console.log("Operação : ABERTA");
        console.log("Iniciando monitoramento...");
        console.log("");

        websocketService.enviar({

            proposal_open_contract: 1,

            contract_id: contractId,

            subscribe: 1

        });

    }

}

module.exports = new ContractMonitorEngine();