const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server {

    constructor() {

        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.socket();

    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.static('public') );

    }

    routes() {
        // this.app.use( this.paths.auth, auth );
    }

    // Objeto socket es el que se encarga de escuchar los eventos
    socket() {

        // Objeto io es el que se encarga de emitir los eventos a todos los clientes conectados
        this.io.on('connection', socketController);       
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log( `Servidor corriendo en http://localhost:${this.port}` );
        } )
    }

}

module.exports = Server;