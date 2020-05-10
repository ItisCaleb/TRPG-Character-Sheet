document.write("");
$(document).ready(function () {
    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length-1];
    //when hover on button, change their color
    $('#change-password').click(function () {
        $('#password-window').show();
    });
    $('#cancel-password').click(function () {
        $('#password-window').hide();
    });
    $('#menu').click(function () {
        $('.right-menu').show();
        $('#overlay').show();
    });
    $('#overlay').click(function () {
        $(this).hide();
    })

    //if user is already logged in, switch login and sign in button to user page and log out button
    if (document.cookie.indexOf("auth_token") >= 0) {
        $('.login').addClass('user').text('個人主頁');
        $('.signup').addClass('exit').text('登出');
        $('.user').click(function () {
            redirect('/user')
        });
        //log out and clear cookies
        $('.exit').click(function () {
            Cookies.remove('auth_token', '');
            Cookies.remove('admin', '');
            redirect('/');
        })
    } else {
        $('.login').click(function () {
            redirect('/login');
        });
        $('.signup').click(function () {
            redirect('/signup')
        });
    }
    //if user is admin, show admin post button
    if (document.cookie.indexOf('admin') >= 0 && Cookies.get('admin') === 'True')
        $('.adminpost').show();
    if (document.cookie.indexOf('auth_token') >= 0)
        $('.logged_in').show();
    //alert message when user use invalid format to sign up and log in
    setInterval(function () {
        $('.input').each(function () {
            const input = $(this).find('.input-box');
            if(input.val().length===0){
                input.focus(function (e) {
                    $(this).parent('.input').css("borderBottomColor", "#46A3FF");
                });
                input.blur(function () {
                    $(this).parent('.input').css("borderBottomColor", "#ccc");
                });
            }
            if(input.val().length >=1 && id !=='login' && id !=='signup'){
                $(this).css("borderBottomColor", "#46A3FF");
            }
        });
    },0)
    $("input,textarea,select").mousedown(zoomDisable).mouseup(zoomEnable);
    function zoomDisable(){
        $('head meta[name=viewport]').remove();
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>\n');
    }
    function zoomEnable(){
        $('head meta[name=viewport]').remove();
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1">');
    }
});

//redirect URL function
function redirect(URL) {
    window.location.href = URL;
}

function check() {
    var email=$('.email-box');
    var text = $(".input-box");
    const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const pattern = new RegExp("[`~!#$^&*()=\\-|{}\':+;,\\\\\\[\\]<>\\n/?￥…【】‘”“。、%]");
    if(!email.val().match(emailRule)){
        $('.check-btn').prop('disabled',true);
        bad_message("電子郵件格式錯誤");
        setTimeout(function () {
            $('.check-btn').prop('disabled',false);
        },1000)
        return true
    }
    text.each(function () {
        if($(this).val().match(pattern)){
            $('.check-btn').prop('disabled',true);
            bad_message("含有特殊字元");
            setTimeout(function () {
                $('.check-btn').prop('disabled',false);
            },1000)
            return true
        }
    })
    return false
}

function good_message(data) {
    $('.pop').hide()
    $('.alert-message').append('<div class="message-div"><div class="message-alert"><p class="message-content">' + data + '</p><div class="good-message-line"></div></div></div>');
    setTimeout(function () {
        $('.alert-message').find('.message-div').remove();
    }, 1000)
}
function bad_message(data) {
    $('.pop').hide()
    $('.alert-message').append('<div class="message-div"><div class="message-alert"><p class="message-content">' + data + '</p><div class="bad-message-line"></div></div></div>');
    setTimeout(function () {
        $('.alert-message').find('.message-div').remove();
    }, 1000)
}
function get(URL) {
    $.ajax({
        url: URL,
        type: 'GET',
        success:function(data){
            if (data && data.status !==400){
                redirect(URL);
            }
            if (data.status===400){
                bad_message(data.responseText);
            }
        },
        error: function (data) {
            bad_message(data.responseText)
        },
    });
}

$(document).mouseup(function (e)
{

    var container = $(".pop");
    var side_container = $(".side-pop");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
    if (!side_container.is(e.target) // if the target of the click isn't the container...
        && side_container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        side_container.hide();
    }
});

