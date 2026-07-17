const fs = require("fs");
const path = require("path");

class Logger {

    constructor() {

        this.logsPath = path.join(process.cwd(), "logs");

    }

    info(message) {

        this.write("INFO", message);

    }

    success(message) {

        this.write("SUCCESS", message);

    }

    warning(message) {

        this.write("WARNING", message);

    }

    error(message) {

        this.write("ERROR", message);

    }

    trade(message) {

        this.write("TRADE", message);

    }

    event(message) {

        this.write("EVENT", message);

    }

    debug(message) {

        this.write("DEBUG", message);

    }

    write(type, message) {

        const now = new Date();

        const time = now.toLocaleTimeString("pt-BR");

        const line = `[${time}] [${type}] ${message}`;

        console.log(line);

        const fileName = now.toISOString().slice(0, 10) + ".log";

        const file = path.join(

            this.logsPath,

            fileName

        );

        fs.appendFileSync(

            file,

            line + "\n"

        );

    }

}

module.exports = new Logger();