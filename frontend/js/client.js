const socket = io('https://pankaj-chatapp-u8l6.onrender.com');

// get Dom elements in receving js variable
const form = document.getElementById("send-container");
const messageinput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

//Audio that will play on receving message
const tingMsg =  new Audio("ting.mp3");
const tick = new Audio("tick.mp3");

//function which will append to the container
const append = (message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

//Ask new user for his name and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined",name);

// if new user joins, receive  the event from the server
socket.on('user-joined',name=>{
    append(`${name}: joined the chat`,'right');
    tingMsg.play();
})

//if server sends the message, receive it
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
    tingMsg.play();
})

// if useer leaves the chat, append the info into to the container
socket.on('left',name=>{
    append(`${name} : left the chat!`,'right');
    tingMsg.play();
})
 
// if the form get submitted send server the message
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you : ${message}`,"right");
    socket.emit('send',message);
    messageinput.value = '';
    tick.play();
})
