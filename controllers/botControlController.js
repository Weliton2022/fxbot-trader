const botControlService = require("../services/botControlService");

class BotControlController {

    start(req, res) {

        const status = botControlService.start();

        res.json(status);

    }

    pause(req, res) {

        const status = botControlService.pause();

        res.json(status);

    }

    stop(req, res) {

        const status = botControlService.stop();

        res.json(status);

    }

    status(req, res) {

        const status = botControlService.status();

        res.json(status);

    }

}

module.exports = new BotControlController();