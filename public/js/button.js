document.write("");
$(document).ready(function () {

    //when hover on button, change their color
    $(".btn").hover(function () {
        $(this).css({"color": "#46A3FF", "borderBottomColor": "#46A3FF"})
    }, function () {
        $(this).css({"color": "", "borderBottomColor": ""})
    });
    $('#change_password').click(function () {
        $('#password_input').css({'visibility': 'visible'});
    });
    $('#cancel_password').click(function () {
        $('#password_input').css({'visibility': 'hidden'});
    });
    //if user is already logged in, switch login and sign in button to user page and log out button
    if (document.cookie.indexOf("auth_token") >= 0) {
        $('#login').attr('id', 'user').text('個人主頁');
        $('#signup').attr('id', 'exit').text('登出');
        $('#user').click(function () {
            redirect('/user')
        });
        //log out and clear cookies
        $('#exit').click(function () {
            Cookies.remove('auth_token', '');
            Cookies.remove('admin', '');
            redirect('/');
        })
    } else {
        $('#login').click(function () {
            redirect('/login');
        });
        $('#signup').click(function () {
            redirect('/signup')
        });
    }
    //if user is admin, show admin post button
    if (document.cookie.indexOf('admin') >= 0 && Cookies.get('admin') === 'True')
        $('.adminpost').css({'visibility': 'visible'});
    if (document.cookie.indexOf('auth_token') >= 0)
        $('.logged_in').css({'visibility': 'visible'});
    //alert message when user use invalid format to sign up and log in
    $(".check-btn").click(function () {
        const regExp = /,/;
        const pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\].<>/?~!@#￥……&*()——|{}【】‘;:”“'。,、?%]");
        const result = text.match(pattern);
        if (!result) {
            alert("含有特殊字元")
        }
    });
    $('#myform').submit(function (e) {
        e.preventDefault();
        $.post($(this).attr('action'),$(this).serializeArray());
    });
});
//redirect URL function
function redirect(URL) {
  window.location.href=URL;
}


