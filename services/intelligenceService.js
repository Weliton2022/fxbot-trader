const IntelligenceReport = require("../models/IntelligenceReport");

const performanceMetricsService = require("./performanceMetricsService");
const financialState = require("./financialStateService");

class IntelligenceService {

    analisar() {

        const report = new IntelligenceReport();

        const metrics = performanceMetricsService.obter();

        // ===============================
        // STATUS
        // ===============================

        report.status = "Neutro";
        report.color = "yellow";
        report.confidence = 50;
        report.recommendation = "Continuar monitorando.";
        report.summary = "Dados insuficientes para análise.";

        // ===============================
        // PERFORMANCE EXCELENTE
        // ===============================

        if (

            Number(metrics.profitFactor) >= 1.30 &&
            Number(metrics.expectancy) > 0 &&
            Number(metrics.winRate) >= 55

        ) {

            report.status = "Estratégia Saudável";
            report.color = "green";
            report.confidence = 95;
            report.recommendation = "Continuar operando.";
            report.summary =
                "Profit Factor elevado, Expectancy positiva e excelente taxa de acerto.";

            return report;

        }

        // ===============================
        // PERFORMANCE BOA
        // ===============================

        if (

            Number(metrics.profitFactor) >= 1 &&
            Number(metrics.expectancy) >= 0

        ) {

            report.status = "Estratégia Estável";
            report.color = "blue";
            report.confidence = 80;
            report.recommendation = "Operação dentro da normalidade.";
            report.summary =
                "A estratégia apresenta comportamento consistente.";

            return report;

        }

        // ===============================
        // LOSS STREAK
        // ===============================

        if (

            financialState.currentLossStreak >= 4

        ) {

            report.status = "Sequência de Losses";
            report.color = "orange";
            report.confidence = 40;
            report.recommendation = "Reduzir exposição ao mercado.";
            report.summary =
                "Foi detectada uma sequência elevada de perdas.";

            return report;

        }

        // ===============================
        // PERFORMANCE RUIM
        // ===============================

        if (

            Number(metrics.profitFactor) < 1 &&
            Number(metrics.expectancy) < 0

        ) {

            report.status = "Estratégia em Risco";
            report.color = "red";
            report.confidence = 20;
            report.recommendation = "Interromper novas operações.";
            report.summary =
                "Os indicadores mostram deterioração da estratégia.";

            return report;

        }

        return report;

    }

}

module.exports = new IntelligenceService();