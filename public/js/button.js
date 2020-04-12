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

});

//redirect URL function
function redirect(URL) {
    window.location.href = URL;
}

function check() {
    const regExp = /,/;
    var text = $(".input").val();
    const pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~!#￥……&*()——|{}【】‘;:”“'。,、?%]");
    const result = text.match(pattern);
    if (result) {
        console.log(text)
        message("含有特殊字元")
        return true
    } else {
        return false
    }
}

function message(data) {
    $('.message').append('<div class="message_div"><p class="message-alert">' + data + '</p></div>')
    setTimeout(function () {
        $('.message-alert').remove();
    }, 1500)
}

