document.write("");
$(document).ready(function () {
        $(".btn").hover(function () {
            $(this).css({"color": "#46A3FF", "borderBottomColor": "#46A3FF"})
        }, function () {
            $(this).css({"color": "", "borderBottomColor": ""})
        });
        if (document.cookie.indexOf("auth_token")>=0) {
            $('#login').attr('id','user').text('個人主頁');
            $('#signup').attr('id','exit').text('登出');
            $('#user').click(function () {
                redirect('/user')
            });
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
        if(document.cookie.indexOf('admin')>=0 && Cookies.get('admin')==='True' )
            $('.adminpost').css({'visibility':'visible'});
        if(document.cookie.indexOf('ValidValue')>=0){
            alert(Cookies.get('ValidValue'));
            Cookies.remove('ValidValue');
            }
});
function redirect(URL) {
  window.location.href=URL;
}


