const websocketService = require("./websocketService");

class ContractsGateway {

    consultar(symbol, currency = "USD") {

        console.log("");
        console.log("📑 CONTRACTS GATEWAY");
        console.log("----------------------------------");
        console.log("Consultando contratos...");
        console.log(`Ativo.....: ${symbol}`);
        console.log(`Moeda.....: ${currency}`);
        console.log("");

        websocketService.enviar({

            contracts_for: symbol,

            currency

        });

    }

}

module.exports = new ContractsGateway();