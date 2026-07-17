const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const subscriptionService = require("../services/subscriptionService");
const contractRegistry = require("../services/contractRegistry");
const operationManager = require("../services/operationManager");
const tradeHistoryService = require("../services/tradeHistoryService");

const fxbotState = require("../services/fxbotStateService");
const { STATES } = require("../services/fxbotStateService");

class ContractResultEngine {

    constructor() {

        eventBus.on(EVENTS.OPEN_CONTRACT_MESSAGE, (mensagem) => {

            this.processar(mensagem);

        });

    }

    processar(mensagem) {

        const contrato = mensagem.proposal_open_contract;

        if (!contrato) {

            return;

        }

        const operation = operationManager.obterAtual();

        if (!operation) {

            return;

        }

        if (!operation.contractId) {

            return;

        }

        if (operation.contractId !== contrato.contract_id) {

            console.log("");
            console.log("🟡 CONTRACT RESULT");
            console.log("----------------------------------");
            console.log("Mensagem ignorada.");
            console.log(`Contrato recebido : ${contrato.contract_id}`);
            console.log(`Contrato ativo    : ${operation.contractId}`);
            console.log("");

            return;

        }

        if (!contrato.is_sold) {

            return;

        }

        // Finaliza a operação
        operation.settlement({

            entrySpot: contrato.entry_spot,

            exitSpot: contrato.exit_spot

        });

        operationManager.fechar(

            contrato.status,

            contrato.profit

        );

        tradeHistoryService.adicionar({

    time: new Date(),

    symbol: operation.symbol,

    direction: operation.direction,

    stake: operation.stake,

    result: contrato.status,

    profit: contrato.profit,

    contractId: contrato.contract_id

});

        // Estado da plataforma
        fxbotState.setState(STATES.FINISHED);

        console.log("");
        console.log("==================================");
        console.log("📄 CONTRATO ENCERRADO");
        console.log("==================================");
        console.log(`Contrato : ${contrato.contract_id}`);
        console.log(`Status   : ${contrato.status}`);
        console.log(`Lucro    : ${contrato.profit}`);
        console.log(`Compra   : ${contrato.buy_price}`);
        console.log(`Venda    : ${contrato.sell_price}`);
        console.log("");

        contractRegistry.finalizar(

            contrato.status,

            contrato.profit

        );

        // Primeiro notificamos toda a plataforma
        eventBus.emit(

            EVENTS.TRADE_CLOSED,

            operation

        );

        // Depois limpamos recursos
        subscriptionService.esquecer(

            contrato.contract_id

        );

        contractRegistry.reset();

        operationManager.limpar();

        // Pronto para uma nova análise
        fxbotState.setState(STATES.ANALYSING);

    }

}

module.exports = new ContractResultEngine();