class SessionManager {

    constructor() {

        this.reset();

    }

    reset() {

        this.session = {

            id: Date.now().toString(),

            startedAt: new Date(),

            botState: "IDLE",

            trade: {

                id: null,

                contractId: null,

                symbol: null,

                direction: null,

                stake: 0,

                status: "IDLE"

            },

            financial: {

                balance: 0,

                totalProfit: 0,

                dailyProfit: 0,

                wins: 0,

                losses: 0,

                trades: 0

            }

        };

    }

    get() {

        return this.session;

    }

}

module.exports = new SessionManager();