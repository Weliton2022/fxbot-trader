const platformStateService = require("../services/platformStateService");

class PlatformController {

    get(req, res) {

        try {

            const state = platformStateService.get();

            res.status(200).json({

                success: true,

                data: state

            });

        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                success: false,

                message: "Erro ao obter estado da plataforma."

            });

        }

    }

}

module.exports = new PlatformController();