class TradeStateService {

    constructor() {

        this.operando = false;

    }

    estaOperando() {

        return this.operando;

    }

    iniciarOperacao() {

        this.operando = true;

        console.log("");
        console.log("🔒 TradeManager");
        console.log("----------------------------------");
        console.log("Estado: OPERANDO");
        console.log("");

    }

    finalizarOperacao() {

        this.operando = false;

        console.log("");
        console.log("🔓 TradeManager");
        console.log("----------------------------------");
        console.log("Estado: LIVRE");
        console.log("");

    }

}

module.exports = new TradeStateService();