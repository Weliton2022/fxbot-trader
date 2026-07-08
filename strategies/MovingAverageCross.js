const Signal = require("../models/Signal");
const config = require("../config/fxbot");

class MovingAverageCross {

    analisar(indicadores) {

        if (

            indicadores.smaFast === null ||

            indicadores.smaSlow === null

        ) {

            return new Signal({

                signal: "WAIT",

                strategy: "MovingAverageCross",

                confidence: 0,

                reason: "Indicadores insuficientes."

            });

        }

        if (indicadores.smaFast > indicadores.smaSlow) {

            return new Signal({

                signal: "BUY",

                strategy: "MovingAverageCross",

                confidence: 80,

                reason: `SMA ${config.SMA_FAST} acima da SMA ${config.SMA_SLOW}.`

            });

        }

        if (indicadores.smaFast < indicadores.smaSlow) {

            return new Signal({

                signal: "SELL",

                strategy: "MovingAverageCross",

                confidence: 80,

                reason: `SMA ${config.SMA_FAST} abaixo da SMA ${config.SMA_SLOW}.`

            });

        }

        return new Signal({

            signal: "WAIT",

            strategy: "MovingAverageCross",

            confidence: 50,

            reason: "Sem cruzamento."

        });

    }

}

module.exports = new MovingAverageCross();