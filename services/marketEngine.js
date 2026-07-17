const accountService = require("./accountService");
const otpService = require("./otpService");
const marketService = require("./marketService");
const websocketService = require("./websocketService");

const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

const config = require("../config/fxbot");

class MarketEngine {

    async iniciar() {

        console.log("📈 Market Engine iniciado.");
        console.log("");

        console.log("🔍 Buscando contas...");

        const contas = await accountService.obterContas();

        if (!contas.demo) {

            console.log("❌ Conta DEMO não encontrada.");

            return;

        }

        console.log("✅ Conta DEMO:");
        console.log(contas.demo.account_id);
        console.log("");

        console.log("🔑 Gerando OTP...");

        const url = await otpService.gerar(contas.demo.account_id);

        console.log("✅ OTP gerado.");
        console.log("");

        console.log("🟢 Conectando WebSocket...");

        await websocketService.conectar(url);

        console.log("✅ WebSocket conectado.");
        console.log("");

        // Escuta mensagens publicadas pelo WebSocketService

        eventBus.on(EVENTS.ACTIVE_SYMBOLS_MESSAGE, (mensagem) => {

            this.processarActiveSymbols(mensagem);

        });

        eventBus.on(EVENTS.TICK_MESSAGE, (mensagem) => {

            this.processarTick(mensagem);

        });

        // NOVO EVENTO
        eventBus.on(EVENTS.HISTORY_MESSAGE, (mensagem) => {

            this.processarHistory(mensagem);

        });

        console.log("📡 Solicitando Active Symbols...");

        websocketService.enviar({

            active_symbols: "full"

        });

    }

    processarActiveSymbols(mensagem) {

        console.log("📥 Active Symbols recebidos.");

        marketService.setAtivos(mensagem.active_symbols);

        console.log(`Total de ativos: ${mensagem.active_symbols.length}`);

        const ativo = mensagem.active_symbols.find(

            a => a.underlying_symbol === config.DEFAULT_SYMBOL

        );

        if (!ativo) {

            console.log("❌ Ativo padrão não encontrado.");

            return;

        }

        marketService.selecionarAtivo(ativo);

        console.log("");
        console.log("🎯 Ativo selecionado:");
        console.log(`${ativo.underlying_symbol_name} (${ativo.underlying_symbol})`);
        console.log("");

        console.log("📈 Assinando Tick...");

        websocketService.enviar({

            ticks: ativo.underlying_symbol,

            subscribe: 1

        });

    }

    processarTick(mensagem) {

    marketService.atualizarTick(mensagem.tick);

    console.log(
        "📈 Tick:",
        mensagem.tick.quote,
        "-",
        mensagem.tick.epoch
    );

}

    // NOVO MÉTODO
    processarHistory(mensagem) {

        console.log("");
        console.log("📚 HISTORY RECEBIDO");
        console.log("----------------------------------");
        console.log(JSON.stringify(mensagem, null, 2));
        console.log("");

    }

}

module.exports = new MarketEngine();