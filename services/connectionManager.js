const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class ConnectionManager {

    constructor() {

        this.connected = false;
        this.reconnecting = false;
        this.attempt = 0;

    }

    conectado() {

        this.connected = true;
        this.reconnecting = false;
        this.attempt = 0;

        console.log("");
        console.log("🟢 CONNECTION MANAGER");
        console.log("----------------------------------");
        console.log("Status : ONLINE");
        console.log("");

    }

    desconectado(code) {

        this.connected = false;

        console.log("");
        console.log("🔴 CONNECTION MANAGER");
        console.log("----------------------------------");
        console.log(`Conexão perdida (${code})`);
        console.log("");

        this.reconectar();

    }

    reconectar() {

        if (this.reconnecting) {

            return;

        }

        this.reconnecting = true;

        this.attempt++;

        console.log("");
        console.log("🟡 CONNECTION MANAGER");
        console.log("----------------------------------");
        console.log(`Reconectando... tentativa ${this.attempt}`);
        console.log("");

        eventBus.emit(EVENTS.RECONNECT_REQUIRED);

    }

    estaConectado() {

        return this.connected;

    }

}

module.exports = new ConnectionManager();