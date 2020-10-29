module.exports = function (socket) {
    socket.on('join',function (url) {
        socket.join(url);
    });
    socket.on('input',function (data) {
        console.log(data)
    })
    socket.on('delete',function (id){

    })

};