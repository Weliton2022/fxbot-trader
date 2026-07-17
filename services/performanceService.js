const PerformanceSnapshot = require("../models/PerformanceSnapshot");

class PerformanceService {

    constructor() {

        this.snapshot = new PerformanceSnapshot();

    }

    atualizar(financialState) {

        const s = this.snapshot;

        s.totalTrades = financialState.totalTrades;

        s.wins = financialState.wins;

        s.losses = financialState.losses;

        s.winRate =
            s.totalTrades > 0
                ? Number(((s.wins / s.totalTrades) * 100).toFixed(2))
                : 0;

    }

    obter() {

        return this.snapshot;

    }

}

module.exports = new PerformanceService();