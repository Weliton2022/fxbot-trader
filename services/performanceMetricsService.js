const PerformanceMetrics = require("../models/PerformanceMetrics");
const financialState = require("./financialStateService");
const tradeHistoryService = require("./tradeHistoryService");

class PerformanceMetricsService {

    obter() {

        const metrics = new PerformanceMetrics();

        // =====================================
        // ESTATÍSTICAS GERAIS
        // =====================================

        metrics.totalTrades = financialState.totalTrades;
        metrics.wins = financialState.wins;
        metrics.losses = financialState.losses;
        metrics.totalProfit = financialState.totalProfit;

        metrics.winRate =
            metrics.totalTrades > 0
                ? Number(
                    (metrics.wins / metrics.totalTrades) * 100
                ).toFixed(2)
                : "0.00";

        // =====================================
        // HISTÓRICO
        // =====================================

        const trades = tradeHistoryService.listar();

        const wins = trades.filter(trade => Number(trade.profit) > 0);

        const losses = trades.filter(trade => Number(trade.profit) <= 0);

        // =====================================
        // AVERAGE WIN
        // =====================================

        if (wins.length > 0) {

            const totalWins = wins.reduce((total, trade) => {

                return total + Number(trade.profit);

            }, 0);

            metrics.averageWin = Number(

                totalWins / wins.length

            ).toFixed(2);

        } else {

            metrics.averageWin = "0.00";

        }

        // =====================================
        // AVERAGE LOSS
        // =====================================

        if (losses.length > 0) {

            const totalLosses = losses.reduce((total, trade) => {

                return total + Math.abs(Number(trade.profit));

            }, 0);

            metrics.averageLoss = Number(

                totalLosses / losses.length

            ).toFixed(2);

        } else {

            metrics.averageLoss = "0.00";

        }

        // =====================================
        // PAYOFF
        // =====================================

        if (Number(metrics.averageLoss) > 0) {

            metrics.payoff = Number(

                Number(metrics.averageWin) /

                Number(metrics.averageLoss)

            ).toFixed(2);

        } else {

            metrics.payoff = "0.00";

        }

        // =====================================
        // PROFIT FACTOR
        // =====================================

        const lucroBruto = wins.reduce((total, trade) => {

            return total + Number(trade.profit);

        }, 0);

        const perdaBruta = losses.reduce((total, trade) => {

            return total + Math.abs(Number(trade.profit));

        }, 0);

        if (perdaBruta > 0) {

            metrics.profitFactor = Number(

                lucroBruto / perdaBruta

            ).toFixed(2);

        } else {

            metrics.profitFactor = "0.00";

        }

        // =====================================
        // EXPECTANCY
        // =====================================

        const taxaWin = Number(metrics.winRate) / 100;

        const taxaLoss = 1 - taxaWin;

        metrics.expectancy = Number(

            (

                taxaWin *

                Number(metrics.averageWin)

            ) -

            (

                taxaLoss *

                Number(metrics.averageLoss)

            )

        ).toFixed(4);

        // =====================================
        // MAIOR WIN
        // =====================================

        if (wins.length > 0) {

            metrics.biggestWin = Math.max(

                ...wins.map(trade => Number(trade.profit))

            ).toFixed(2);

        } else {

            metrics.biggestWin = "0.00";

        }

        // =====================================
        // MAIOR LOSS
        // =====================================

        if (losses.length > 0) {

            metrics.biggestLoss = Math.min(

                ...losses.map(trade => Number(trade.profit))

            ).toFixed(2);

        } else {

            metrics.biggestLoss = "0.00";

        }

        return metrics;

    }

}

module.exports = new PerformanceMetricsService();