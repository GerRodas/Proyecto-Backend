const socket = io();

socket.emit('products', (data)=> console.log(data));