const { listarMercados } = require("../services/marketService");

async function executar() {

    const mercados = await listarMercados();

    console.log("===== MERCADOS =====");

    console.dir(mercados, { depth: null });

}

executar();