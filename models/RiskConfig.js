class RiskConfig {

    constructor() {

        this.stopWin = 10;

        this.stopLoss = -10;

        this.maxTrades = 500;

        this.maxWinStreak = 20;

        this.maxLossStreak = 5;

        this.enabled = true;

    }

}

module.exports = RiskConfig;