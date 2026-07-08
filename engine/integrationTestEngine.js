const ExecutionRequest = require("../models/ExecutionRequest");
const Signal = require("../models/Signal");

const derivBroker = require("../services/derivBroker");
const marketService = require("../services/marketService");
const config = require("../config/fxbot");

class IntegrationTestEngine {

    async testarProposal() {

        console.log("🔥 IntegrationTestEngine EXECUTOU");

        const ativo = marketService.getAtivoAtual();

        if (!ativo) {

            console.log("");
            console.log("❌ TESTE");
            console.log("----------------------------------");
            console.log("Ativo ainda não carregado.");
            console.log("");

            return;

        }

        const signal = new Signal({

            signal: "BUY",

            strategy: "IntegrationTest",

            confidence: 100,

            reason: "Teste de integração"

        });

        const request = new ExecutionRequest({

            signal,

            symbol: ativo.underlying_symbol,

            stake: config.DEFAULT_STAKE,

            duration: config.DEFAULT_DURATION,

            contractType: "CALL"

        });

        console.log("");
        console.log("🧪 INTEGRATION TEST");
        console.log("----------------------------------");
        console.log("Enviando Proposal...");
        console.log("");

        await derivBroker.proposal(request);

    }

}

module.exports = new IntegrationTestEngine();