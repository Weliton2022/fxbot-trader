class BotControlService {

    constructor() {

        this.running = true;

    }

    start() {

        this.running = true;

        console.log("");
        console.log("🤖 BOT CONTROL");
        console.log("----------------------------------");
        console.log("Status : RUNNING");
        console.log("");

        return this.status();

    }

    pause() {

        this.running = false;

        console.log("");
        console.log("🤖 BOT CONTROL");
        console.log("----------------------------------");
        console.log("Status : PAUSED");
        console.log("");

        return this.status();

    }

    stop() {

        this.running = false;

        console.log("");
        console.log("🤖 BOT CONTROL");
        console.log("----------------------------------");
        console.log("Status : STOPPED");
        console.log("");

        return this.status();

    }

    isRunning() {

        return this.running;

    }

    isPaused() {

        return !this.running;

    }

    status() {

        return {

            running: this.running

        };

    }

}

module.exports = new BotControlService();