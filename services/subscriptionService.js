
class SubscriptionService {

    constructor() {

        this.subscriptions = new Map();

    }

    registrar(contractId, subscriptionId) {

        this.subscriptions.set(contractId, subscriptionId);

    }

    obter(contractId) {

        return this.subscriptions.get(contractId);

    }

    remover(contractId) {

        this.subscriptions.delete(contractId);

    }

    listar() {

        return [...this.subscriptions.entries()];

    }

    esquecer(contractId) {

        const subscriptionId = this.obter(contractId);

        if (!subscriptionId) {

            return;

        }

        const websocketService = require("./websocketService");

        console.log("");
        console.log("🧹 SUBSCRIPTION MANAGER");
        console.log("----------------------------------");
        console.log(`Contrato    : ${contractId}`);
        console.log(`Subscription: ${subscriptionId}`);
        console.log("Cancelando assinatura...");
        console.log("");

        websocketService.enviar({

            forget: subscriptionId

        });

        this.remover(contractId);

    }

}

module.exports = new SubscriptionService();