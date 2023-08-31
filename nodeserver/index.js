// Node server which will handale socket io connection
const io = require('socket.io')(8000,{
    cors:{
        Origin: ["http://localhost:8080"],
    },
});
const users = {};
// if new user joined let other people know.
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    // if someone sends the messsge brosdcast to the other ppeople.
    socket.on('send',message=>{ 
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    // if someone leaves the chat let other people know.
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

     
})