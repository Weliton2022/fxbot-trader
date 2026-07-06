const { obterContas } = require("../services/accountService");

async function dashboard(req, res) {

    const contas = await obterContas();

    res.render("dashboard", {

        titulo: "FXBOT Trader",

        contaDemo: contas.demo,

        contaReal: contas.real

    });

}

module.exports = {

    dashboard

};