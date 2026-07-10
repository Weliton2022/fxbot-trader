const DerivGateway = require("../gateways/DerivGateway");

class BrokerFactory {

    static create() {

        // Futuramente será definido por configuração.
        return DerivGateway;

    }

}

module.exports = BrokerFactory;