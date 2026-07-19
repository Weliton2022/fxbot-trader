const WebSocket = require("ws");
const logger = require("./logger");

class DerivSocket {

    constructor() {

        this.ws = null;

    }

    conectar(url) {

        return new Promise((resolve, reject) => {

            this.ws = new WebSocket(url);

            this.ws.on("open", () => {

                logger.log("🟢 WEBSOCKET CONECTADO");

                resolve();

            });

            this.ws.on("message", (data) => {

                const mensagem = JSON.parse(data);

                logger.log("📨 MENSAGEM", mensagem);

            });

            this.ws.on("error", reject);

        });

    }

    enviar(comando) {

        logger.log("📤 ENVIANDO", comando);

        this.ws.send(

            JSON.stringify(comando)

        );

    }

}

module.exports = new DerivSocket();