const fs = require("fs");
const path = require("path");

class PersistenceService {

    constructor() {

        this.dataFolder = path.join(process.cwd(), "data");

        this.defaultFiles = {

            "trades.json": [],
            "statistics.json": {},
            "settings.json": {},
            "sessions.json": [],
            "logs.json": [],
            "version.json": {

                version: "1.0.0"

            }

        };

        this.inicializar();

    }

    inicializar() {

        if (!fs.existsSync(this.dataFolder)) {

            fs.mkdirSync(this.dataFolder);

        }

        for (const [arquivo, conteudo] of Object.entries(this.defaultFiles)) {

            const caminho = this.arquivo(arquivo);

            if (!fs.existsSync(caminho)) {

                fs.writeFileSync(

                    caminho,

                    JSON.stringify(conteudo, null, 4),

                    "utf8"

                );

            }

        }

    }

    arquivo(nome) {

        return path.join(this.dataFolder, nome);

    }

    salvar(nome, dados) {

        fs.writeFileSync(

            this.arquivo(nome),

            JSON.stringify(dados, null, 4),

            "utf8"

        );

    }

    carregar(nome, valorPadrao = null) {

        const caminho = this.arquivo(nome);

        if (!fs.existsSync(caminho)) {

            return valorPadrao;

        }

        return JSON.parse(

            fs.readFileSync(caminho, "utf8")

        );

    }

    existe(nome) {

        return fs.existsSync(

            this.arquivo(nome)

        );

    }

    remover(nome) {

        const caminho = this.arquivo(nome);

        if (fs.existsSync(caminho)) {

            fs.unlinkSync(caminho);

        }

    }

}

module.exports = new PersistenceService();