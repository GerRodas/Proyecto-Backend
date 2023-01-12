

const socket = io();



let user;
let chatBox = document.getElementById('chatBox')



Swal.fire({
    title: "Identificate",
    input:"text",
    inputValidator: (value) => {
        return !value && 'Necesitas poner un nombre de usuario'
    },
    allowOutsideClick: false,

}).then(result=>{
    user=result.value
    socket.emit('authenticated', user)
})

chatBox.addEventListener('keyup', event =>{
    if(event.key == 'Enter'){
        if(chatBox.value.trim().length >0){
            socket.emit('message',{
                user,
                message: chatBox.value
            })
        }
    }
})