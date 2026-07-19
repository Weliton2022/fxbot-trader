const RiskReport = require("../models/RiskReport");

const performanceMetricsService = require("./performanceMetricsService");

class RiskManagerService {

    analisar() {

        const report = new RiskReport();

        const metrics = performanceMetricsService.obter();

        // =====================================
        // WIN RATE
        // =====================================

        if (Number(metrics.winRate) < 45) {

            report.allowed = false;

            report.level = "HIGH";

            report.reason = "Win Rate abaixo do mínimo.";

            report.maxStake = 0;

            report.color = "red";

            return report;

        }

        // =====================================
        // PROFIT FACTOR
        // =====================================

        if (Number(metrics.profitFactor) < 1) {

            report.level = "MEDIUM";

            report.reason = "Profit Factor abaixo do ideal.";

            report.maxStake = 0.50;

            report.color = "orange";

        }

        return report;

    }

}

module.exports = new RiskManagerService();