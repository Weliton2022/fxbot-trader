class RiskManager {

    validar(contexto) {

        // Primeira versão:
        // Sempre libera a operação.

        return {

            autorizado: true,

            motivo: "Operação autorizada."

        };

    }

}

module.exports = new RiskManager();