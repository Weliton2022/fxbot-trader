class SMA {

    calcular(candles, periodo) {

        if (candles.length < periodo) {

            return null;

        }

        const ultimos = candles.slice(-periodo);

        const soma = ultimos.reduce((total, candle) => {

            return total + candle.close;

        }, 0);

        return soma / periodo;

    }

}

module.exports = new SMA();