const performanceService = require("../services/performanceService");

class AnalyticsApiController {

    obter(req, res) {

        const performance = performanceService.obter();

        res.json({

            totalTrades: performance.totalTrades,

            wins: performance.wins,

            losses: performance.losses,

            winRate: performance.winRate

        });

    }

}

module.exports = new AnalyticsApiController();