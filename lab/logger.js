class Logger {

    log(titulo, dados = null) {

        console.log("");
        console.log("======================================");
        console.log(titulo);
        console.log("======================================");

        if (dados) {

            console.log(JSON.stringify(dados, null, 2));

        }

        console.log("");

    }

}

module.exports = new Logger();