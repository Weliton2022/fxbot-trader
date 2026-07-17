const tradeHistoryService = require("../services/tradeHistoryService");

class HistoryApiController {

    listar(req, res) {

        res.json(

            tradeHistoryService.listar()

        );

    }

}

module.exports = new HistoryApiController();