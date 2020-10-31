module.exports = function (socket) {
    socket.on('joinSheet',function (url) {
        socket.join(url);
    });
    socket.on('clientInput',function (data,key,url) {
        socket.to(url).emit('syncInput', data,key)
    })
    socket.on('clientDelete',function (id){
        socket.to(id).emit('deleteSheet')
    })

};
