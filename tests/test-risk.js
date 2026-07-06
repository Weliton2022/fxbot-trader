const risk = require("../engine/riskManager");

const resultado = risk.validar({

    saldo: 10000,

    stopLoss: 100,

    stopGain: 200,

    operacoesAbertas: 0

});

console.log(resultado);