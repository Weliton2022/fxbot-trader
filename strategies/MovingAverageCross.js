const Signal = require("../models/Signal");

class MovingAverageCross {

    analisar(indicadores) {

        if (

            indicadores.sma9 === null ||

            indicadores.sma21 === null

        ) {

            return new Signal({

                signal: "WAIT",

                strategy: "MovingAverageCross",

                confidence: 0,

                reason: "Indicadores insuficientes."

            });

        }

        if (indicadores.sma9 > indicadores.sma21) {

            return new Signal({

                signal: "BUY",

                strategy: "MovingAverageCross",

                confidence: 80,

                reason: "SMA 9 acima da SMA 21."

            });

        }

        if (indicadores.sma9 < indicadores.sma21) {

            return new Signal({

                signal: "SELL",

                strategy: "MovingAverageCross",

                confidence: 80,

                reason: "SMA 9 abaixo da SMA 21."

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