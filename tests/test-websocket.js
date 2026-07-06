require("dotenv").config();

const axios = require("axios");
const websocket = require("../services/websocketService");

async function iniciar() {

    try {

        // Solicita OTP da conta DEMO
        const resposta = await axios.post(

            "https://api.derivws.com/trading/v1/options/accounts/DOT92235291/otp",

            {},

            {
                headers: {
                    Authorization: `Bearer ${process.env.DERIV_API_TOKEN}`,
                    "Deriv-App-ID": process.env.DERIV_APP_ID
                }
            }

        );

        const url = resposta.data.data.url;

        console.log("🟢 Conectando...");

        await websocket.conectar(url);

        console.log("🟢 Conectado!");

        // Escuta mensagens
        websocket.ouvir((mensagem) => {

            console.dir(mensagem, { depth: null });

        });

        // Solicita lista completa de ativos
        websocket.enviar({

    active_symbols: "full"

});

    }

    catch (erro) {

        console.log(erro);

    }

}

iniciar();