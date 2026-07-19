const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class RecoveryService {

    constructor() {

        console.log("🛟 RecoveryService inicializado.");

        eventBus.on(EVENTS.CONNECTION_OPEN, () => {

            console.log("");
            console.log("🛟 RECOVERY");
            console.log("----------------------------------");
            console.log("Conexão estabelecida.");
            console.log("");

        });

        eventBus.on(EVENTS.CONNECTION_CLOSED, (data) => {

            console.log("");
            console.log("🛟 RECOVERY");
            console.log("----------------------------------");
            console.log("Conexão perdida.");
            console.log(`Código : ${data.code}`);
            console.log(`Motivo : ${data.reason}`);
            console.log("");

        });

    }

}

module.exports = new RecoveryService();