class Candle {

    constructor(price, epoch) {

        this.open = price;
        this.high = price;
        this.low = price;
        this.close = price;

        this.startEpoch = epoch;
        this.endEpoch = epoch;

        this.ticks = 1;

    }

    atualizar(price, epoch) {

        if (price > this.high) {
            this.high = price;
        }

        if (price < this.low) {
            this.low = price;
        }

        this.close = price;
        this.endEpoch = epoch;

        this.ticks++;

    }

}

module.exports = Candle;