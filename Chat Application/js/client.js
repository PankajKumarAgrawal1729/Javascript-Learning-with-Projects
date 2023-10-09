// const socket = io('http://localhost:8000');




// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);

const socket = io('http://localhost:8000', {
  transports: ['websocket']
});

const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector(".chatContainer");
const mainContainer = document.querySelector('.container');
var audio = new Audio('Ting_Sound_Effect.mp3');
audio.autoplay = true;

function scrollTop(){
  mainContainer.scrollTop = mainContainer.scrollHeight;
}
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position === 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
    scrollTop();
})

const name = prompt("Enter your name to join");

socket.on('connect_error', error => {
  console.log('Error connecting to server:', error);
});

socket.emit('new-user-joined', name, error => {
  if (error) {
    console.log('Error sending event:', error);
  } else {
    console.log('Event sent successfully');
  }
});

socket.on('user-joined', name => {
    if(name !== null)
    append(`${name} joined the chat`, 'right');
    scrollTop();
});

socket.on('receive', data => {
    if(data.name !== null )
    append(`${data.name}: ${data.message}`, 'left');
    scrollTop();
});

socket.on('left', name => {
    if(name !== null)
    append(`${name} left the chat`, 'left');
    scrollTop();
});
