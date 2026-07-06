const { obterContas } = require("../services/accountService");

async function executar() {

    const contas = await obterContas();

    console.log("\n===== FXBOT =====\n");

    console.log("CONTA REAL");

    console.log(contas.real);

    console.log("\nCONTA DEMO");

    console.log(contas.demo);

}

executar();