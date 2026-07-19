const configService = require("./configService");

class ProposalService {

    criar(request) {

        const trading = configService.getTrading();
        const market = configService.getMarket();

        return {

            proposal: 1,

            amount: request.stake ?? trading.stake,

            basis: "stake",

            contract_type: request.contractType,

            currency: "USD",

            duration: request.duration ?? trading.duration,

            duration_unit: "t",

            underlying_symbol: request.symbol ?? market.symbol,

            req_id: Date.now(),

            passthrough: {

                strategy: request.signal?.strategy,

                created_at: request.createdAt

            }

        };

    }

}

module.exports = new ProposalService();