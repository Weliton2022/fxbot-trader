const dashboardService = require("../services/dashboardService");

class DashboardController {

    index(req, res) {

        const snapshot = dashboardService.obter();

        res.render("dashboard", {

            title: "FXBOT Platform",

            snapshot,
            hasSnapshot: dashboardService.possuiSnapshot()

        });

    }

}

module.exports = new DashboardController();