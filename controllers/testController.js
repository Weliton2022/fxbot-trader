const ExecutionRequest = require("../models/ExecutionRequest");
const Signal = require("../models/Signal");

const marketService = require("../services/marketService");
const derivBroker = require("../services/derivBroker");

const config = require("../config/fxbot");

class TestController {

    async proposal(req, res) {

        try {

            const ativo = marketService.getAtivoAtual();

            if (!ativo) {

                return res.status(400).json({

                    success: false,
                    message: "Nenhum ativo selecionado."

                });

            }

            const signal = new Signal({

                signal: "BUY",

                strategy: "Manual Test",

                confidence: 100,

                reason: "Teste Manual"

            });

            const request = new ExecutionRequest({

                signal,

                symbol: ativo.underlying_symbol,

                stake: config.DEFAULT_STAKE,

                duration: config.DEFAULT_DURATION,

                contractType: "CALL"

            });

            await derivBroker.proposal(request);

            return res.json({

                success: true,
                message: "Proposal enviada."

            });

        } catch (erro) {

            console.error(erro);

            return res.status(500).json({

                success: false,
                message: erro.message

            });

        }

    }

}

module.exports = new TestController();