const dashboardService = require("../services/dashboardService");

class DashboardApiController {

    obter(req, res) {

        const snapshot = dashboardService.obter();

        if (!snapshot) {

            return res.status(204).send();

        }

        res.json(snapshot);

    }

}

module.exports = new DashboardApiController();