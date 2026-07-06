const eventBus = require("../core/eventBus");
const EVENTS = require("../core/events");

class MarketService {

    constructor() {

        this.ativos = [];
        this.ativoAtual = null;
        this.ultimoTick = null;

    }

    setAtivos(lista) {

        this.ativos = lista;

    }

    getAtivos() {

        return this.ativos;

    }

    selecionarAtivo(ativo) {

        this.ativoAtual = ativo;

    }

    getAtivoAtual() {

        return this.ativoAtual;

    }

    atualizarTick(tick) {

        this.ultimoTick = tick;

        eventBus.emit(EVENTS.TICK, tick);

    }

    getUltimoTick() {

        return this.ultimoTick;

    }

}

module.exports = new MarketService();