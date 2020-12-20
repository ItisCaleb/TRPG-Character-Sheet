module.exports = function (socket) {
    socket.on('joinSession',function (id) {
        socket.join(id);
    });
    socket.on('playerJoin',function (data,id) {
        socket.to(id).emit('syncPlayer', data)
    })
    socket.on('playerLeave',function (id){
        socket.to(id).emit('deletePlayer')
    })
    socket.on('sheetUpdate',function (data,id){
        socket.to(id).emit('syncSheet',data)
    })

};
