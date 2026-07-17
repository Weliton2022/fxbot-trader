const performanceMetricsService = require("../services/performanceMetricsService");

class PerformanceController {

    dados(req, res) {

        res.json(

            performanceMetricsService.obter()

        );

    }

}

module.exports = new PerformanceController();