const configService = require("../services/configService");

class ConfigController {

    get(req, res) {

        res.json({

            success: true,

            data: {

                market: configService.getMarket(),

                trading: configService.getTrading(),

                indicators: configService.getIndicators(),

                risk: configService.getRisk(),

                logs: configService.getLogs()

            }

        });

    }

    update(req, res) {

        const updates = req.body;

        const changed = [];

        for (const key in updates) {

            if (configService.set(key, updates[key])) {

                changed.push(key);

            }

        }

        res.json({

            success: true,

            updated: changed,

            config: configService.get()

        });

    }

}

module.exports = new ConfigController();