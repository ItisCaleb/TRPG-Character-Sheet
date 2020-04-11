document.write('');
$(document).ready(function () {
    //connect socket to the server
    const socket = io('kulmi.cnmc.tw:3000');
    socket.on('alert',function (data) {
        alert(data);
    });
});