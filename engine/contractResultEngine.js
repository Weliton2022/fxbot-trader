const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const subscriptionService = require("../services/subscriptionService");
const contractRegistry = require("../services/contractRegistry");
const operationManager = require("../services/operationManager");
const tradeHistoryService = require("../services/tradeHistoryService");
const tradeLifecycle = require("../services/tradeLifecycleService");

const financialStateService = require("../services/financialStateService");
const sessionStateService = require("../services/sessionStateService");

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

        if (!contrato) return;

        const operation = operationManager.obterAtual();

        if (!operation) return;

        if (!operation.contractId) return;

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

        const contratoFinalizado =
            contrato.is_sold ||
            contrato.is_expired ||
            contrato.status === "won" ||
            contrato.status === "lost";

        if (!contratoFinalizado) {

            return;

        }

        // ======================================
        // Determina o resultado real
        // ======================================

        const profit = Number(contrato.profit || 0);

        let resultado = "draw";

        if (profit > 0) {

            resultado = "won";

        } else if (profit < 0) {

            resultado = "lost";

        }

        // ======================================
        // Trade Lifecycle
        // ======================================

        tradeLifecycle.data.contractClosedAt = new Date();

        tradeLifecycle.stage("CONTRACT_CLOSED");

        // ======================================
        // Finaliza operação
        // ======================================

        operation.settlement({

            entrySpot: contrato.entry_spot,

            exitSpot: contrato.exit_spot

        });

        operationManager.fechar(

            resultado,

            profit

        );

        // ======================================
        // Atualiza Financeiro Global
        // ======================================

        financialStateService.registrarResultado({

            profit

        });

        // ======================================
        // Atualiza Estatísticas da Sessão
        // ======================================

        sessionStateService.registrarResultado({

            profit

        });

        // ======================================
        // Histórico
        // ======================================

        tradeHistoryService.adicionar({

            time: new Date(),

            symbol: operation.symbol,

            direction: operation.direction,

            stake: operation.stake,

            result: resultado,

            profit,

            contractId: contrato.contract_id

        });

        // ======================================
        // Estado da Plataforma
        // ======================================

        fxbotState.setState(STATES.FINISHED);

        console.log("");
        console.log("==================================");
        console.log("📄 CONTRATO ENCERRADO");
        console.log("==================================");
        console.log(`Contrato : ${contrato.contract_id}`);
        console.log(`Resultado: ${resultado.toUpperCase()}`);
        console.log(`Lucro    : ${profit}`);
        console.log(`Compra   : ${contrato.buy_price ?? "-"}`);
        console.log(`Venda    : ${contrato.sell_price ?? "-"}`);
        console.log("");

        contractRegistry.finalizar(

            resultado,

            profit

        );

        // ======================================
        // Notifica a Plataforma
        // ======================================

        eventBus.emit(

            EVENTS.TRADE_CLOSED,

            operation

        );

        tradeLifecycle.stage("FINISHED");

        // ======================================
        // Limpeza
        // ======================================

        subscriptionService.esquecer(

            contrato.contract_id

        );

        contractRegistry.reset();

        operationManager.limpar();

        tradeLifecycle.reset();

        fxbotState.setState(STATES.ANALYSING);

    }

}

module.exports = new ContractResultEngine();