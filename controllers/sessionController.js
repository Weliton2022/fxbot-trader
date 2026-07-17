const sessionState = require("../services/sessionStateService");

class SessionController {

    dados(req, res) {

        res.json(sessionState.data);

    }

}

module.exports = new SessionController();