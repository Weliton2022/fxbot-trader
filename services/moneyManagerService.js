class MoneyManagerService {

    constructor() {

        this.balance = 0;

        this.dailyProfit = 0;

        this.dailyLoss = 0;

        this.totalWins = 0;

        this.totalLosses = 0;

        this.totalTrades = 0;

        this.currentStake = 1;

    }

    registrarResultado(profit) {

        this.totalTrades++;

        if (profit > 0) {

            this.totalWins++;

            this.dailyProfit += profit;

        } else {

            this.totalLosses++;

            this.dailyLoss += Math.abs(profit);

        }

    }

    setSaldo(balance) {

        this.balance = balance;

    }

    getStake() {

        return this.currentStake;

    }

    getResumo() {

        return {

            saldo: this.balance,

            lucro: this.dailyProfit,

            perda: this.dailyLoss,

            wins: this.totalWins,

            losses: this.totalLosses,

            trades: this.totalTrades,

            stake: this.currentStake

        };

    }

}

module.exports = new MoneyManagerService();