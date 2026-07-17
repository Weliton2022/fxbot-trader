const operationManager = require("./operationManager");
const financialState = require("./financialStateService");
const sessionManager = require("./sessionManager");

class PlatformStateService {

    getState() {

        return {

            session: sessionManager.get(),

            operation: operationManager.obterAtual(),

            financial: financialState.data

        };

    }

}

module.exports = new PlatformStateService();