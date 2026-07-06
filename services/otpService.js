require("dotenv").config();

const axios = require("axios");

class OTPService {

    async gerar(accountId) {

        const resposta = await axios.post(

            `https://api.derivws.com/trading/v1/options/accounts/${accountId}/otp`,

            {},

            {
                headers: {

                    Authorization: `Bearer ${process.env.DERIV_API_TOKEN}`,

                    "Deriv-App-ID": process.env.DERIV_APP_ID

                }

            }

        );

        return resposta.data.data.url;

    }

}

module.exports = new OTPService();