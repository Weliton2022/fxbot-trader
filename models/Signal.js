class Signal {

    constructor({

        signal,

        confidence = 0,

        strategy = "",

        reason = ""

    }) {

        this.signal = signal;

        this.confidence = confidence;

        this.strategy = strategy;

        this.reason = reason;

        this.timestamp = new Date();

    }

    isBuy() {

        return this.signal === "BUY";

    }

    isSell() {

        return this.signal === "SELL";

    }

    isWait() {

        return this.signal === "WAIT";

    }

}

module.exports = Signal;