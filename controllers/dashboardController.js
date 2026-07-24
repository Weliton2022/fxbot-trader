const path = require("path");
const dashboardService = require("../services/dashboardService");

class DashboardController {

    index(req, res) {

        console.log("=================================");
        console.log("CONTROLLER EXECUTADO");
        console.log("ARQUIVO:", __filename);
        console.log("VIEW:", path.join(__dirname, "../views/pages/dashboard.ejs"));
        console.log("=================================");

        const snapshot = dashboardService.obter();

        res.render("pages/dashboard", {
            title: "FXBOT Platform",
            snapshot,
            hasSnapshot: dashboardService.possuiSnapshot()
        });

    }

}

module.exports = new DashboardController();