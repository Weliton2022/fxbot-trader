require("dotenv").config();

const axios = require("axios");

const API_URL = "https://api.derivws.com/trading/v1/options/accounts";

async function listarContas() {

    try {

        const resposta = await axios.get(API_URL, {

            headers: {
                Authorization: `Bearer ${process.env.DERIV_API_TOKEN}`,
                "Deriv-App-ID": process.env.DERIV_APP_ID
            }

        });

        return resposta.data.data;

    } catch (erro) {

        console.error("Erro ao buscar contas.");

        if (erro.response) {
            console.error(erro.response.data);
        } else {
            console.error(erro.message);
        }

        return [];

    }

}

async function obterContas() {

    const contas = await listarContas();

    const contaReal = contas.find(c => c.account_type === "real");

    const contaDemo = contas.find(c => c.account_type === "demo");

    return {

        real: contaReal || null,

        demo: contaDemo || null

    };

}

module.exports = {

    listarContas,

    obterContas

};