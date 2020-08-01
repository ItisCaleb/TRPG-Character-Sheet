document.write("");
$(document).ready(function () {
    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length - 1];
    //when hover on button, change their color
    $('#change-password').on('click', function () {
        $('#password-window').show();
    });
    $('#cancel-password').on('click', function () {
        $('#password-window').hide();
    });
    $('#menu').on('click', function () {
        $('.right-menu').show();
        $('#overlay').show();
    });
    $('#overlay').on('click', function () {
        $(this).hide();
    });

    //if user is already logged in, switch login and sign in button to user page and log out button
    if (document.cookie.indexOf("auth_token") >= 0) {
        $('.login').addClass('user').text('個人主頁');
        $('.signup').addClass('exit').text('登出');
        $('.user').on('click', function () {
            redirect('/user')
        });
        //log out and clear cookies
        $('.exit').on('click', function () {
            Cookies.remove('auth_token', '');
            Cookies.remove('admin', '');
            redirect('/');
        })
    } else {
        $('.login').on('click', function () {
            redirect('/login');
        });
        $('.signup').on('click', function () {
            redirect('/signup')
        });
    }
    //if user is admin, show admin post button
    if (document.cookie.indexOf('admin') >= 0 && Cookies.get('admin') === 'True')
        $('.menu').last().after('<li class="menu btn adminpost"><a href=\'/adminpost\'>管理員貼文</a></li>');
    if (document.cookie.indexOf('auth_token') >= 0)
        $('.logged_in').show();
    $('ul.main-tabs li').on('click', function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.main-tabs li').removeClass('main-current');
        $('.main-tab-content').removeClass('main-current');

        $(this).addClass('main-current');
        $("#" + tab_id).addClass('main-current');
    })

    $("input,textarea,select").mousedown(zoomDisable).mouseup(zoomEnable);

    function zoomDisable() {
        $('head meta[name=viewport]').remove();
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>\n');
    }

    function zoomEnable() {
        $('head meta[name=viewport]').remove();
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1">');
    }
});

//redirect URL function
function redirect(URL) {
    window.location.href = URL;
}

function check() {
    var email = $('.email-box');
    var text = $(".input-box");
    const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const pattern = new RegExp("[`~!#$^&*()=\\-|{}\':+;,\\\\\\[\\]<>\\n/?￥…【】‘”“。、%]");
    if (!email.val().match(emailRule)) {
        $('.check-btn').prop('disabled', true);
        bad_message("電子郵件格式錯誤");
        setTimeout(function () {
            $('.check-btn').prop('disabled', false);
        }, 1000)
        return true
    }
    text.each(function () {
        if ($(this).val().match(pattern)) {
            $('.check-btn').prop('disabled', true);
            bad_message("含有特殊字元");
            setTimeout(function () {
                $('.check-btn').prop('disabled', false);
            }, 1000)
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

var debug = true;//true: add debug logs when cloning
var evenMoreListeners = true;//demonstrat re-attaching javascript Event Listeners (Inline Event Listeners don't need to be re-attached)
if (evenMoreListeners) {
    var allFleChoosers = $("input[type='file']");
    addEventListenersTo(allFleChoosers);
    function addEventListenersTo(fileChooser) {
        fileChooser.change(function (event) { console.log("file( #" + event.target.id + " ) : " + event.target.value.split("\\").pop()) });
        fileChooser.on('click',function (event) { console.log("open( #" + event.target.id + " )") });
    }
}
var clone = {};
// FileClicked()
function fileClicked(event) {
    var fileElement = event.target;
    if (fileElement.value !== "") {
        if (debug) { console.log("Clone( #" + fileElement.id + " ) : " + fileElement.value.split("\\").pop()) }
        clone[fileElement.id] = $(fileElement).clone(); //'Saving Clone'
    }
    //What ever else you want to do when File Chooser Clicked
}
// FileChanged()
function fileChanged(event) {
    var fileElement = event.target;
    if (fileElement.value === "") {
        if (debug) { console.log("Restore( #" + fileElement.id + " ) : " + clone[fileElement.id].val().split("\\").pop()) }
        clone[fileElement.id].insertBefore(fileElement); //'Restoring Clone'
        $(fileElement).remove(); //'Removing Original'
        if (evenMoreListeners) { addEventListenersTo(clone[fileElement.id]) }//If Needed Re-attach additional Event Listeners
    }
    //What ever else you want to do when File Chooser Changed
}

function get(URL) {
    $.ajax({
        url: URL,
        type: 'GET',
        success: function (data) {
            if (data && data.status !== 400) {
                redirect(URL);
            }
            if (data.status === 400) {
                bad_message(data.responseText);
            }
        },
        error: function (data) {
            bad_message(data.responseText)
        },
    });
}

$(document).mouseup(function (e) {

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

