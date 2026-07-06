class ExecutionRequest {

    constructor({

        signal,

        symbol,

        stake,

        duration,

        contractType

    }) {

        this.signal = signal;

        this.symbol = symbol;

        this.stake = stake;

        this.duration = duration;

        this.contractType = contractType;

        this.createdAt = new Date();

    }

}

module.exports = ExecutionRequest;