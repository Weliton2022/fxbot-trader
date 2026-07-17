const WebSocket = require("ws");

const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const subscriptionService = require("./subscriptionService");
const connectionManager = require("./connectionManager");

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

                connectionManager.conectado();

                console.log("🟢 WebSocket conectado.");

                resolve();

            });

            this.ws.on("close", (code, reason) => {

                this.connected = false;

                console.log("");
                console.log("🔴 WEBSOCKET FECHADO");
                console.log("----------------------------------");
                console.log(`Código : ${code}`);
                console.log(`Motivo : ${reason.toString()}`);
                console.log("");

                connectionManager.desconectado(code);

            });

            this.ws.on("error", (erro) => {

                console.log("");
                console.log("❌ ERRO WEBSOCKET");
                console.log("----------------------------------");
                console.log(erro);
                console.log("");

                reject(erro);

            });

            this.ws.on("message", (dados) => {

                const mensagem = JSON.parse(dados);

                this.processarMensagem(mensagem);

            });

        });

    }

    processarMensagem(mensagem) {

        console.log("");
        console.log("📨 MENSAGEM DERIV");
        console.log("----------------------------------");
        console.log(JSON.stringify(mensagem, null, 2));
        console.log("");

        if (mensagem.error) {

            eventBus.emit(EVENTS.ERROR_MESSAGE, mensagem);

            return;

        }

        switch (mensagem.msg_type) {

            case "active_symbols":

                eventBus.emit(EVENTS.ACTIVE_SYMBOLS_MESSAGE, mensagem);

                break;

            case "tick":

                eventBus.emit(EVENTS.TICK_MESSAGE, mensagem);

                break;

            case "history":

                eventBus.emit(EVENTS.HISTORY_MESSAGE, mensagem);

                break;

            case "proposal":

                console.log("");
                console.log("✅ EVENTO -> PROPOSAL_MESSAGE");
                console.log("");

                eventBus.emit(EVENTS.PROPOSAL_MESSAGE, mensagem);

                break;

            case "buy":

                console.log("");
                console.log("✅ EVENTO -> BUY_MESSAGE");
                console.log("");

                eventBus.emit(EVENTS.BUY_MESSAGE, mensagem);

                break;

            case "proposal_open_contract":

                console.log("");
                console.log("✅ EVENTO -> OPEN_CONTRACT_MESSAGE");
                console.log("");

                if (
                    mensagem.subscription &&
                    mensagem.subscription.id &&
                    mensagem.proposal_open_contract &&
                    mensagem.proposal_open_contract.contract_id
                ) {

                    subscriptionService.registrar(
                        mensagem.proposal_open_contract.contract_id,
                        mensagem.subscription.id
                    );

                }

                eventBus.emit(
                    EVENTS.OPEN_CONTRACT_MESSAGE,
                    mensagem
                );

                break;

            case "forget":

                console.log("");
                console.log("✅ EVENTO -> FORGET_MESSAGE");
                console.log("");

                if (EVENTS.FORGET_MESSAGE) {

                    eventBus.emit(
                        EVENTS.FORGET_MESSAGE,
                        mensagem
                    );

                }

                break;

            case "balance":

                eventBus.emit(EVENTS.BALANCE_MESSAGE, mensagem);

                break;

            case "authorize":

                eventBus.emit(EVENTS.AUTHORIZE_MESSAGE, mensagem);

                break;

            default:

                console.log(`📩 MSG NÃO TRATADA: ${mensagem.msg_type}`);

        }

    }

    enviar(comando) {

        if (!this.connected) {

            console.log("⚠ WebSocket não conectado.");

            return;

        }

        console.log("");
        console.log("📤 ENVIANDO PARA DERIV");
        console.log("----------------------------------");
        console.log(JSON.stringify(comando, null, 2));
        console.log("");

        this.ws.send(JSON.stringify(comando));

    }

    estaConectado() {

        return this.connected;

    }

}

module.exports = new WebSocketService();