document.write("");
$(document).ready(function () {
        const socket = io('localhost:3000');
        socket.on('alert',function (data) {
            alert(data);
        });
        socket.on('SessionFind',function (msg) {
            $('#session').append('<div>'+msg+'</div>');
        });
        //when hover on button, change their color
        $(".btn").hover(function () {
            $(this).css({"color": "#46A3FF", "borderBottomColor": "#46A3FF"})
        }, function () {
            $(this).css({"color": "", "borderBottomColor": ""})
        });
        //if user is already logged in, switch login and sign in button to user page and log out button
        if (document.cookie.indexOf("auth_token")>=0) {
            $('#login').attr('id','user').text('個人主頁');
            $('#signup').attr('id','exit').text('登出');
            $('#user').click(function () {
                redirect('/user')
            });
        //log out and clear cookies
            $('#exit').click(function () {
                Cookies.remove('auth_token','');
                Cookies.remove('admin','');
                redirect('/');
        })}else {
            $('#login').click(function () {
                redirect('/login');
            });
            $('#signup').click(function () {
                redirect('/signup')
            });
        }
        //if user is admin, show admin post button
        if(document.cookie.indexOf('admin')>=0 && Cookies.get('admin')==='True' )
            $('.adminpost').css({'visibility':'visible'});
        //alert message when user use invalid format to sign up and log in
        $(".check-btn").click(function() {
            const regExp = /,/;
            const pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\].<>/?~!@#￥……&*()——|{}【】‘;:”“'。,、?%]");
            const result = text.match(pattern);
            if (!result) {
                alert("含有特殊字元")
            }
        });

    });
//redirect URL function
function redirect(URL) {
  window.location.href=URL;
}


