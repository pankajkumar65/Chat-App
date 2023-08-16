const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageinput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const tingMsg =  new Audio("../ting.mp3");
const tick = new Audio("../tick.mp3");

const append = (message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener("submit",(e)=>{
     e.preventDefault();
     const message = messageinput.value;
     append(`you : ${message}`,"right");
     socket.emit('send',message);
     messageinput.value = '';
     tick.play();  
})
const name = prompt("Enter your name to join");
socket.emit("new-user-joined",name);
append(`welcome to our chat ${name}!`,'mid')


socket.on('user-joined',name=>{
    append(`${name} : joined the chat...`,'right');
})
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
    // tingMsg.play();
})

socket.on('left',name=>{
    append(`${name} : left the chat!`,'left');
})
 
