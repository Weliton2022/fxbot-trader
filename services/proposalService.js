class ProposalService {

    criar(request) {

        return {

            proposal: 1,

            amount: request.stake,

            basis: "stake",

            contract_type: request.contractType,

            currency: "USD",

            duration: request.duration,

            duration_unit: "t",

            underlying_symbol: request.symbol,

            req_id: Date.now(),

            passthrough: {

                strategy: request.signal.strategy,

                created_at: request.createdAt

            }

        };

    }

}

module.exports = new ProposalService();