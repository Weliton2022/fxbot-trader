class PerformanceSnapshot {

    constructor() {

        this.totalTrades = 0;

        this.wins = 0;

        this.losses = 0;

        this.winRate = 0;

        this.profitFactor = 0;

        this.payoff = 0;

        this.expectancy = 0;

        this.averageWin = 0;

        this.averageLoss = 0;

        this.biggestWin = 0;

        this.biggestLoss = 0;

        this.currentDrawdown = 0;

        this.maxDrawdown = 0;

    }

}

module.exports = PerformanceSnapshot;