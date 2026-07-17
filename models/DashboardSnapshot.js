class DashboardSnapshot {

    constructor({

        botState = "IDLE",

        operation = null,

        financial = {},

        market = {},

        strategy = "MovingAverageCross",

        broker = "Deriv Demo"

    }) {

        this.timestamp = new Date();

        this.version = "1.0.0";

        this.botState = botState;

        this.operation = operation;

        this.financial = financial;

        this.market = market;

        this.strategy = strategy;

        this.broker = broker;

    }

}

module.exports = DashboardSnapshot;