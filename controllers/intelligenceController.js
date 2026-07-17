const intelligenceService = require("../services/intelligenceService");

class IntelligenceController {

    obter(req, res) {

        res.json(

            intelligenceService.analisar()

        );

    }

}

module.exports = new IntelligenceController();