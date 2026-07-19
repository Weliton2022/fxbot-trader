const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const websocketService = require("../services/websocketService");
const operationManager = require("../services/operationManager");
const tradeLifecycle = require("../services/tradeLifecycleService");

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

        // ======================================
        // Trade Lifecycle
        // ======================================

        tradeLifecycle.data.buyConfirmedAt = new Date();
        tradeLifecycle.stage("BUY_COMPLETED");

        // Marca a operação como oficialmente aberta
        operationManager.abrir(contractId);

        tradeLifecycle.data.contractOpenedAt = new Date();
        tradeLifecycle.stage("CONTRACT_OPEN");

        // Atualiza o estado da plataforma
        fxbotState.setState(STATES.OPERATING);

        console.log("");
        console.log("📡 CONTRACT MONITOR");
        console.log("----------------------------------");
        console.log(`Contrato : ${contractId}`);
        console.log("Operação : ABERTA");
        console.log("Iniciando monitoramento...");
        console.log("");

        // Primeira assinatura
        websocketService.enviar({

            proposal_open_contract: 1,

            contract_id: contractId,

            subscribe: 1

        });

        /*

        /*
        // ==================================================
        // TESTE CONTROLADO
        // Reassina o contrato uma única vez após 2 segundos.
        // ==================================================

        setTimeout(() => {

            console.log("");
            console.log("🧪 TESTE");
            console.log("----------------------------------");
            console.log("Reassinando proposal_open_contract...");
            console.log(`Contrato: ${contractId}`);
            console.log("");

            websocketService.enviar({

                proposal_open_contract: 1,

                contract_id: contractId,

                subscribe: 1

            });

        }, 2000);
        */

    }

}

module.exports = new ContractMonitorEngine();