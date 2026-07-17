const sessionManager = require("./sessionManager");
const persistenceService = require("./persistenceService");

class FinancialStateService {

    constructor() {

        this.reset();

    }

    reset() {

        const financial = sessionManager.get().financial;

        financial.initialBalance = 0;
        financial.currentBalance = 0;

        financial.dailyProfit = 0;
        financial.totalProfit = 0;

        financial.totalTrades = 0;

        financial.wins = 0;
        financial.losses = 0;

        financial.currentWinStreak = 0;
        financial.currentLossStreak = 0;

        financial.maxWinStreak = 0;
        financial.maxLossStreak = 0;

        financial.currentStake = 0;

        financial.stopWinReached = false;
        financial.stopLossReached = false;

    }

    carregar() {

        const dados = persistenceService.carregar(

            "statistics.json",

            null

        );

        if (!dados) {

            return;

        }

        Object.assign(

            this.data,

            dados

        );

    }

    salvar() {

        persistenceService.salvar(

            "statistics.json",

            this.data

        );

    }

    get data() {

        return sessionManager.get().financial;

    }

    get initialBalance() {

        return this.data.initialBalance;

    }

    set initialBalance(value) {

        this.data.initialBalance = value;

    }

    get currentBalance() {

        return this.data.currentBalance;

    }

    set currentBalance(value) {

        this.data.currentBalance = value;

    }

    get dailyProfit() {

        return this.data.dailyProfit;

    }

    set dailyProfit(value) {

        this.data.dailyProfit = value;

    }

    get totalProfit() {

        return this.data.totalProfit;

    }

    set totalProfit(value) {

        this.data.totalProfit = value;

    }

    get totalTrades() {

        return this.data.totalTrades;

    }

    set totalTrades(value) {

        this.data.totalTrades = value;

    }

    get wins() {

        return this.data.wins;

    }

    set wins(value) {

        this.data.wins = value;

    }

    get losses() {

        return this.data.losses;

    }

    set losses(value) {

        this.data.losses = value;

    }

    get currentWinStreak() {

        return this.data.currentWinStreak;

    }

    set currentWinStreak(value) {

        this.data.currentWinStreak = value;

    }

    get currentLossStreak() {

        return this.data.currentLossStreak;

    }

    set currentLossStreak(value) {

        this.data.currentLossStreak = value;

    }

    get maxWinStreak() {

        return this.data.maxWinStreak;

    }

    set maxWinStreak(value) {

        this.data.maxWinStreak = value;

    }

    get maxLossStreak() {

        return this.data.maxLossStreak;

    }

    set maxLossStreak(value) {

        this.data.maxLossStreak = value;

    }

    get currentStake() {

        return this.data.currentStake;

    }

    set currentStake(value) {

        this.data.currentStake = value;

    }

    get stopWinReached() {

        return this.data.stopWinReached;

    }

    set stopWinReached(value) {

        this.data.stopWinReached = value;

    }

    get stopLossReached() {

        return this.data.stopLossReached;

    }

    set stopLossReached(value) {

        this.data.stopLossReached = value;

    }

    registrarResultado(operation) {

        this.totalTrades++;

        this.totalProfit += operation.profit;

        this.dailyProfit += operation.profit;

        if (operation.profit > 0) {

            this.wins++;

            this.currentWinStreak++;

            this.currentLossStreak = 0;

            if (this.currentWinStreak > this.maxWinStreak) {

                this.maxWinStreak = this.currentWinStreak;

            }

        } else {

            this.losses++;

            this.currentLossStreak++;

            this.currentWinStreak = 0;

            if (this.currentLossStreak > this.maxLossStreak) {

                this.maxLossStreak = this.currentLossStreak;

            }

        }

        this.salvar();

    }

}

module.exports = new FinancialStateService();