const configService = require("./configService");

class WorkspaceService {

    constructor() {

        this.workspace = {

            name: "Meu Workspace",

            trading: {

                ...configService.getTrading(),

                ...configService.getMarket()

            },

            indicators: {

                ...configService.getIndicators()

            },

            risk: {

                ...configService.getRisk()

            },

            logs: {

                ...configService.getLogs()

            }

        };

    }

    get() {

        return this.workspace;

    }

    getTrading() {

        return this.workspace.trading;

    }

    getIndicators() {

        return this.workspace.indicators;

    }

    getRisk() {

        return this.workspace.risk;

    }

    getLogs() {

        return this.workspace.logs;

    }

    update(section, data) {

        if (!this.workspace[section]) {

            return false;

        }

        this.workspace[section] = {

            ...this.workspace[section],

            ...data

        };

        return true;

    }

}

module.exports = new WorkspaceService();