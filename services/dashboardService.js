class DashboardService {

    constructor() {

        this.snapshot = null;

    }

    atualizar(snapshot) {

        this.snapshot = snapshot;

    }

    obter() {

        return this.snapshot;

    }

    possuiSnapshot() {

        return this.snapshot !== null;

    }

}

module.exports = new DashboardService();