module.exports = function (socket) {
    socket.on('join',function (url) {
        socket.join(url);
    });
    socket.on('input',function (data) {
        socket.broadcast.in(data.url).emit('asyncInput',data);
    })
    socket.on('delete',function (id){
        socket.broadcast.in(id).emit('delete');
    })

};