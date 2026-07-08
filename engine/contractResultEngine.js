const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

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

        // Enquanto o contrato estiver aberto
        if (!contrato.is_sold) {

            return;

        }

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

        eventBus.emit(EVENTS.TRADE_CLOSED, contrato);

    }

}

module.exports = new ContractResultEngine();