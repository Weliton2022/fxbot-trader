const WebSocket = require("ws");
const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class WebSocketService {

    constructor() {

        this.ws = null;
        this.connected = false;
        this.url = null;

    }

    async conectar(url) {

        this.url = url;

        return new Promise((resolve, reject) => {

            this.ws = new WebSocket(url);

            this.ws.on("open", () => {

                this.connected = true;

                console.log("🟢 WebSocket conectado.");

                resolve();

            });

            this.ws.on("close", () => {

                this.connected = false;

                console.log("🔴 WebSocket desconectado.");

            });

            this.ws.on("error", (erro) => {

                reject(erro);

            });

            this.ws.on("message", (dados) => {

                const mensagem = JSON.parse(dados);

                this.processarMensagem(mensagem);

            });

        });

    }

    processarMensagem(mensagem) {

        switch (mensagem.msg_type) {

            case "active_symbols":

                eventBus.emit(EVENTS.ACTIVE_SYMBOLS_MESSAGE, mensagem);

                break;

            case "tick":

                eventBus.emit(EVENTS.TICK_MESSAGE, mensagem);

                break;

            case "proposal":

                eventBus.emit(EVENTS.PROPOSAL_MESSAGE, mensagem);

                break;

            case "buy":

                eventBus.emit(EVENTS.BUY_MESSAGE, mensagem);

                break;

            case "balance":

                eventBus.emit(EVENTS.BALANCE_MESSAGE, mensagem);

                break;

            case "authorize":

                eventBus.emit(EVENTS.AUTHORIZE_MESSAGE, mensagem);

                break;

            case "error":

                eventBus.emit(EVENTS.ERROR_MESSAGE, mensagem);

                break;

            default:

                console.log(`📩 MSG: ${mensagem.msg_type}`);

        }

    }

    enviar(comando) {

        if (!this.connected) {

            console.log("⚠ WebSocket não conectado.");

            return;

        }

        this.ws.send(JSON.stringify(comando));

    }

    estaConectado() {

        return this.connected;

    }

}

module.exports = new WebSocketService();