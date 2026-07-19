const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const contractTraceService = require("../services/contractTraceService");

class ContractTraceEngine {

    constructor() {

        eventBus.on(EVENTS.BUY_MESSAGE, (mensagem) => {

            this.buy(mensagem);

        });

        eventBus.on(EVENTS.OPEN_CONTRACT_MESSAGE, (mensagem) => {

            this.contract(mensagem);

        });

        eventBus.on(EVENTS.TRADE_CLOSED, (operation) => {

            this.closed(operation);

        });

    }

    buy(mensagem) {

        if (!mensagem.buy) {

            return;

        }

        contractTraceService.adicionar(

            "BUY_COMPLETED",

            {

                contractId: mensagem.buy.contract_id,

                transactionId: mensagem.buy.transaction_id

            }

        );

        console.log("");
        console.log("🧬 CONTRACT TRACE");
        console.log("----------------------------------");
        console.log("BUY_COMPLETED");
        console.log(`Contrato : ${mensagem.buy.contract_id}`);
        console.log("");

    }

    contract(mensagem) {

        const contrato = mensagem.proposal_open_contract;

        if (!contrato) {

            return;

        }

        contractTraceService.adicionar(

            "CONTRACT_UPDATE",

            {

                contractId: contrato.contract_id,

                status: contrato.status,

                isSold: contrato.is_sold,

                isExpired: contrato.is_expired,

                profit: contrato.profit

            }

        );

        console.log("");
        console.log("🧬 CONTRACT TRACE");
        console.log("----------------------------------");
        console.log("CONTRACT_UPDATE");
        console.log(`Status.....: ${contrato.status}`);
        console.log(`Sold.......: ${contrato.is_sold}`);
        console.log(`Expired....: ${contrato.is_expired}`);
        console.log(`Profit.....: ${contrato.profit}`);
        console.log("");

    }

    closed(operation) {

        contractTraceService.adicionar(

            "TRADE_CLOSED",

            {

                operationId: operation.id,

                result: operation.result,

                profit: operation.profit

            }

        );

        console.log("");
        console.log("🧬 CONTRACT TRACE");
        console.log("----------------------------------");
        console.log("TRADE_CLOSED");
        console.log(`Resultado..: ${operation.result}`);
        console.log(`Lucro......: ${operation.profit}`);
        console.log("");

    }

}

module.exports = new ContractTraceEngine();