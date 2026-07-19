const fxbotStateService = require("./fxbotStateService");
const operationManager = require("./operationManager");
const financialStateService = require("./financialStateService");
const marketService = require("./marketService");
const tradeLifecycleService = require("./tradeLifecycleService");

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

            lifecycle: tradeLifecycleService.data

        };

    }

}

module.exports = new PlatformStateService();