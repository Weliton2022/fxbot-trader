require("dotenv").config();
const axios = require("axios");

async function testar() {

    try {

        const resposta = await axios.get(
            "https://api.derivws.com/trading/v1/options/accounts",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.DERIV_API_TOKEN}`,
                    "Deriv-App-ID": process.env.DERIV_APP_ID
                }
            }
        );

        console.log("========== SUCESSO ==========");
        console.log(resposta.data);

    } catch (erro) {

        console.log("========== ERRO ==========");

        if (erro.response) {
            console.log(erro.response.status);
            console.log(erro.response.data);
        } else {
            console.log(erro.message);
        }

    }

}

testar();