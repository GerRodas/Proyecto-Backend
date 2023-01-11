const socket = io();
let user;
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: "Identificate",
    input:"text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && 'Necesitas poner un nombre de usuario'
    },
    allowOutsideClick: false,

}).then(result=>{
    user=result.value
})