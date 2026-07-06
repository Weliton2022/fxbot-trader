const { listarContas } = require("../services/accountService");

async function executar() {

    const contas = await listarContas();

    console.log("===== CONTAS =====");

    console.log(contas);

}

executar();