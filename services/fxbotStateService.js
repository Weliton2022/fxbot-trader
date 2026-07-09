const STATES = {

    IDLE: "IDLE",

    ANALYSING: "ANALYSING",

    WAITING_PROPOSAL: "WAITING_PROPOSAL",

    BUYING: "BUYING",

    OPERATING: "OPERATING",

    FINISHED: "FINISHED",

    PAUSED: "PAUSED"

};

class FxBotStateService {

    constructor() {

        this.state = STATES.IDLE;

    }

    getState() {

        return this.state;

    }

    setState(state) {

        this.state = state;

        console.log("");
        console.log("🤖 FXBOT STATE");
        console.log("----------------------------------");
        console.log(`Novo Estado: ${state}`);
        console.log("");

    }

    is(state) {

        return this.state === state;

    }

}

module.exports = new FxBotStateService();
module.exports.STATES = STATES;