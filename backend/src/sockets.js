const SocketIO = require('socket.io');

module.exports = (server) => {

    const io = SocketIO.listen(server);

    io.on('connection', (socket) => {

        console.log("nueva conexion: ", socket.handshake.address);

        socket.on("activar_diario", (datos) => {

            socket.broadcast.emit("activar_diario",datos);          

        })

    });

}