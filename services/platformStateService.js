const fxbotStateService = require("./fxbotStateService");
const operationManager = require("./operationManager");
const financialStateService = require("./financialStateService");
const marketService = require("./marketService");
const tradeLifecycleService = require("./tradeLifecycleService");
const sessionStateService = require("./sessionStateService");
const configService = require("./configService");

class PlatformStateService {

    get() {

        return {

            timestamp: new Date(),

            bot: {

                state: fxbotStateService.getState()

            },

            market: {

                active: marketService.getAtivoAtual(),

                lastTick: marketService.getUltimoTick()

            },

            operation: operationManager.obterAtual(),

            financial: financialStateService.data,

            session: sessionStateService.data,

            lifecycle: tradeLifecycleService.data,

            config: configService.get()

        };

    }

}

module.exports = new PlatformStateService();