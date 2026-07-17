const tradeHistoryService = require("./tradeHistoryService");

class AnalyticsService {

    listarTrades() {

        return tradeHistoryService.listar();

    }

    totalTrades() {

        return this.listarTrades().length;

    }

    totalWins() {

        return this.listarTrades()

            .filter(t => Number(t.profit) > 0)

            .length;

    }

    totalLosses() {

        return this.listarTrades()

            .filter(t => Number(t.profit) <= 0)

            .length;

    }

    winRate() {

        const total = this.totalTrades();

        if (total === 0) {

            return 0;

        }

        return Number(

            (

                this.totalWins() /

                total

            ) * 100

        ).toFixed(2);

    }

}

module.exports = new AnalyticsService();