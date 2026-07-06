const strategy = require("../engine/strategyEngine");

const resultado = strategy.analisar({

    symbol: "EURUSD",

    price: 1.16852

});

console.log(resultado);