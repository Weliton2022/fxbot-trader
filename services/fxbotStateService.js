const STATES = {

    IDLE: "IDLE",

    ANALYSING: "ANALYSING",

    WAITING_PROPOSAL: "WAITING_PROPOSAL",

    BUYING: "BUYING",

    OPERATING: "OPERATING",

    FINISHED: "FINISHED",

    PAUSED: "PAUSED"

};

const TRANSITIONS = {

    IDLE: [
        STATES.ANALYSING,
        STATES.PAUSED
    ],

    ANALYSING: [
        STATES.WAITING_PROPOSAL,
        STATES.PAUSED,
        STATES.IDLE
    ],

    WAITING_PROPOSAL: [
        STATES.BUYING,
        STATES.ANALYSING,
        STATES.PAUSED
    ],

    BUYING: [
        STATES.OPERATING,
        STATES.ANALYSING,
        STATES.PAUSED
    ],

    OPERATING: [
        STATES.FINISHED,
        STATES.PAUSED
    ],

    FINISHED: [
        STATES.ANALYSING,
        STATES.IDLE,
        STATES.PAUSED
    ],

    PAUSED: [
        STATES.ANALYSING,
        STATES.IDLE
    ]

};

class FxBotStateService {

    constructor() {

        this.state = STATES.IDLE;

    }

    getState() {

        return this.state;

    }

    transition(nextState) {

        const allowed = TRANSITIONS[this.state] || [];

        if (!allowed.includes(nextState)) {

            console.log("");
            console.log("🚫 STATE MACHINE");
            console.log("----------------------------------");
            console.log(`Atual.......: ${this.state}`);
            console.log(`Solicitado..: ${nextState}`);
            console.log("Transição BLOQUEADA.");
            console.log("");

            return false;

        }

        this.state = nextState;

        console.log("");
        console.log("🤖 FXBOT STATE");
        console.log("----------------------------------");
        console.log(`${this.state}`);
        console.log("");

        return true;

    }

    // Compatibilidade temporária
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