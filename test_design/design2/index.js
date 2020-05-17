'use strict';

function getRandom(x) {
    return Math.floor(Math.random() * x) + 1;
}

var nowtime = 0;

const random_char_list = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|[];':";

setInterval(tick, 30);


const domContainer = document.querySelector('#notification');

var msg1 = "Welcome to trpgtoaster.com!";
var msg2 = "Enjoy it!";


function getRandomStr(i) {
    var n;
    var output = '';
    for (n = 0; n < i; n++) {
        output = output + random_char_list.charAt(getRandom(random_char_list.length))
    }
    return output;
}


function tick() {
    nowtime += 1;
    var gap = 50;
    var changeSpeed = 0.8;
    // console.log(nowtime);
    if (nowtime < msg1.length * changeSpeed) {
        ReactDOM.render(msg1.substring(0, Math.floor(nowtime / changeSpeed)) + getRandomStr(2), domContainer);
        // alert(1);
        return;
    }
    if (msg1.length * changeSpeed < nowtime && nowtime < msg1.length * changeSpeed + gap) {
        ReactDOM.render(msg1, domContainer);
        // alert(2);
        // console.log(2);
        // console.log("l:", msg1.length * 2, "r:", msg1.length * 2 + 30);
        return;
    }

    if (msg1.length * changeSpeed + gap < nowtime && nowtime < msg1.length * changeSpeed * 2 + gap) {
        ReactDOM.render(msg1.substring(0, msg1.length - Math.floor((nowtime - msg1.length * changeSpeed - gap) / changeSpeed)) + getRandomStr(2), domContainer);
        // alert(1);
        return;
    }

    if (msg1.length * changeSpeed * 2 + gap < nowtime && nowtime < msg1.length * changeSpeed * 2 + gap + msg2.length * changeSpeed) {
        ReactDOM.render(msg2.substring(0, Math.floor((nowtime - (msg1.length * changeSpeed * 2 + gap)) / changeSpeed)) + getRandomStr(2), domContainer);
        // alert(3);
        return;
    }

    if (msg1.length * 2 * changeSpeed + gap + msg2.length * changeSpeed < nowtime && nowtime < msg1.length * changeSpeed * 2 + gap + msg2.length * changeSpeed + gap) {
        ReactDOM.render(msg2, domContainer);
        // alert(4);
        return;
    }

    if (msg1.length * 2 * changeSpeed + gap + msg2.length * changeSpeed + gap < nowtime && nowtime < msg1.length * changeSpeed * 2 + gap + msg2.length * 2 * changeSpeed + gap) {
        ReactDOM.render(msg2.substring(0, msg2.length - Math.floor((nowtime - (msg1.length * changeSpeed * 2 + gap + msg2.length * changeSpeed + gap)) / changeSpeed)) + getRandomStr(2), domContainer);
        // alert(1);
        return;
    }


    if (msg1.length * 2 * changeSpeed + gap + msg2.length * changeSpeed * 2 + gap < nowtime) {

        /*nowtime = 0;*/
        var inject_str = ''+alert(123);+'';
        ReactDOM.render('<div></div>');
        alert(5);

    }


}