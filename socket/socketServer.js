const { Server } = require("socket.io");

let io = null;

/**
 * Inicializa o Socket.IO
 */
function initialize(server) {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log(`🟢 Cliente conectado: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`🔴 Cliente desconectado: ${socket.id}`);

        });

    });

    console.log("✅ Socket.IO inicializado.");

    return io;

}

/**
 * Retorna a instância do Socket.IO
 */
function getIO() {

    if (!io) {

        throw new Error("Socket.IO ainda não foi inicializado.");

    }

    return io;

}

module.exports = {
    initialize,
    getIO
};