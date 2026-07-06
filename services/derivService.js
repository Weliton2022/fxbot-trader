const { WebSocket, DERIV_WS } = require("../config/deriv");

const token = process.env.DERIV_API_TOKEN;

async function conectarDeriv() {

    return new Promise((resolve, reject) => {

        const ws = new WebSocket(DERIV_WS);

        ws.on("open", () => {

            console.log("🟢 Conectando à Deriv...");

            ws.send(JSON.stringify({
                authorize: token
            }));

        });

        ws.on("message", (message) => {

            const resposta = JSON.parse(message);

            // Se houve erro de autorização
            if (resposta.error) {
                ws.close();
                return reject(resposta.error);
            }

            // Recebeu a autorização
            if (resposta.msg_type === "authorize") {

                console.log("✅ Autorizado com sucesso!");

                ws.close();

                resolve({
                    login: resposta.authorize.loginid,
                    nome: resposta.authorize.fullname,
                    saldo: resposta.authorize.balance,
                    moeda: resposta.authorize.currency,
                    tipoConta: resposta.authorize.is_virtual ? "Virtual" : "Real"
                });

            }

        });

        ws.on("error", (erro) => {

            reject(erro);

        });

    });

}

module.exports = {
    conectarDeriv
};