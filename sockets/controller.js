const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);
            
    // on es para escuchar
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

    // recibe mensaje 'enviar-mensaje'
    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456;
        callback({id, fecha: new Date().getTime()});

        // emite mensaje 'enviar-mensaje' a todos los clientes conectados con el payload recibido desde el cliente
        socket.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = { 
    socketController 
}