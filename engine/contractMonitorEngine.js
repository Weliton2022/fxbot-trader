const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const websocketService = require("../services/websocketService");
const contractRegistry = require("../services/contractRegistry");

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

        // Registra oficialmente o contrato na plataforma
        contractRegistry.registrar({

            contractId,

            buyPrice: mensagem.buy.buy_price ?? null,

            symbol: mensagem.echo_req?.parameters?.symbol ?? null,

            contractType: mensagem.echo_req?.parameters?.contract_type ?? null,

            subscriptionId: null

        });

        console.log("");
        console.log("📡 CONTRACT MONITOR");
        console.log("----------------------------------");
        console.log(`Contrato: ${contractId}`);
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