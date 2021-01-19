const socket = io('http://localhost:5500')

//Get DOM elements in respactive Js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//Audio that will play on receiving msgs
var audio = new Audio('ring.mp3');

//Function which will append event info to the container
const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();

    }
}

// Ask new user for his/her name and let the server know
const name = prompt('Enter your name')
socket.emit('new-user-joined', name)

// If a new user joins, recive his/her name form the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

//If server sends a message receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

//If a user leave the chat, append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form get submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ' ';
})
