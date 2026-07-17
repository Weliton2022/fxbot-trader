class SessionStateService {

    constructor() {

        this.reset();

    }

    reset() {

        this.data = {

            startedAt: new Date(),

            trades: 0,

            wins: 0,

            losses: 0,

            totalProfit: 0,

            dailyProfit: 0,

            currentWinStreak: 0,

            currentLossStreak: 0,

            maxWinStreak: 0,

            maxLossStreak: 0

        };

    }

    registrarResultado(operation) {

        this.data.trades++;

        this.data.totalProfit += operation.profit;

        this.data.dailyProfit += operation.profit;

        if (operation.profit > 0) {

            this.data.wins++;

            this.data.currentWinStreak++;

            this.data.currentLossStreak = 0;

            if (this.data.currentWinStreak > this.data.maxWinStreak) {

                this.data.maxWinStreak = this.data.currentWinStreak;

            }

        } else {

            this.data.losses++;

            this.data.currentLossStreak++;

            this.data.currentWinStreak = 0;

            if (this.data.currentLossStreak > this.data.maxLossStreak) {

                this.data.maxLossStreak = this.data.currentLossStreak;

            }

        }

    }

}

module.exports = new SessionStateService();