const io = require('socket.io')(5500);

const users = {};


io.on('connection', socket => {

    //If new user joins, let other users connected to the server know !
    socket.on('new-user-joined', name => {
        // console.log("New user", name);

        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });


    // If someone send a msg ,broadcast it other people 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    // If someone Leave a chat , let others konw  
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });


});


