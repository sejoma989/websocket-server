// pedido de conexion al cliente
const socket = io();

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


socket.on('connect', () => {
    // console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

// recepcion de evento 'enviar-mensaje' desde el servidor
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

// listener para boton enviar, crea un objeto payload con el mensaje y lo emite al servidor
btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        idMensaje: '123ABC',
        fecha: new Date().getTime()
    }
    // emision de evento 'enviar-mensaje' al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    })
});
