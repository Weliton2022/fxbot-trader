class TradeLifecycleService {

    constructor() {

        this.reset();

    }

    reset() {

        this.data = {

            stage: "IDLE",

            operationId: null,

            createdAt: null,

            proposalSentAt: null,

            proposalReceivedAt: null,

            buySentAt: null,

            buyConfirmedAt: null,

            contractOpenedAt: null,

            contractClosedAt: null

        };

    }

    stage(name) {

        this.data.stage = name;

        console.log("");
        console.log("🧬 TRADE LIFECYCLE");
        console.log("----------------------------------");
        console.log(`Stage : ${name}`);
        console.log("");

    }

}

module.exports = new TradeLifecycleService();