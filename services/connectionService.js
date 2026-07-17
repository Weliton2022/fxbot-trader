const websocketService = require("./websocketService");

class ConnectionService {

    constructor() {

        const appId = process.env.DERIV_APP_ID;

        this.url = `wss://ws.derivws.com/websockets/v3?app_id=${appId}`;

    }

    async conectar() {

        console.log("");
        console.log("==================================");
        console.log("🌐 CONNECTION SERVICE");
        console.log("==================================");
        console.log("Iniciando conexão...");
        console.log(`URL: ${this.url}`);
        console.log("");

        await websocketService.conectar(this.url);

        console.log("");
        console.log("✅ CONNECTION SERVICE");
        console.log("WebSocket conectado.");
        console.log("");

    }

}

module.exports = new ConnectionService();