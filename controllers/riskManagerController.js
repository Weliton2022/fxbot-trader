const riskManagerService = require("../services/riskManagerService");

class RiskManagerController {

    obter(req, res) {

        res.json(

            riskManagerService.analisar()

        );

    }

}

module.exports = new RiskManagerController();