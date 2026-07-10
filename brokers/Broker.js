class Broker {

    async conectar() {

        throw new Error("Método conectar() não implementado.");

    }

    async proposal(request) {

        throw new Error("Método proposal() não implementado.");

    }

    async buy(proposalId, price) {

        throw new Error("Método buy() não implementado.");

    }

    async balance() {

        throw new Error("Método balance() não implementado.");

    }

}

module.exports = Broker;