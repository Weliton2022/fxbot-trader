const eventBus = require("../core/eventBus");

console.log("===== TESTE EVENTBUS =====");

eventBus.on("tick", (tick) => {

    console.log("✅ Evento recebido!");

    console.log(tick);

});

console.log("Emitindo evento...");

eventBus.emit("tick", {

    symbol: "TESTE",

    quote: 123.45

});

console.log("Fim.");