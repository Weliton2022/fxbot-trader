const persistenceService = require("./persistenceService");

class TradeHistoryService {

    constructor() {

        this.maxItems = 20;

        this.history = persistenceService.carregar(

            "trades.json",

            []

        );

    }

    adicionar(trade) {

        this.history.unshift(trade);

        if (this.history.length > this.maxItems) {

            this.history.pop();

        }

        persistenceService.salvar(

            "trades.json",

            this.history

        );

    }

    listar() {

        return this.history;

    }

    limpar() {

        this.history = [];

        persistenceService.salvar(

            "trades.json",

            this.history

        );

    }

}

module.exports = new TradeHistoryService();