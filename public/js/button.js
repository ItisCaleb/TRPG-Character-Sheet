document.write("");
$(document).ready(function () {
        $(".btn").hover(function () {
            $(this).css({"color": "#46A3FF", "borderBottomColor": "#46A3FF"})
        }, function () {
            $(this).css({"color": "", "borderBottomColor": ""})
        });
        if (document.cookie.indexOf("auth_token")>=0){
            $('.subbtn.btn.validation').hide();
            $('.exit').click(function () {
                Cookies.remove('auth_token');
            });
        }else{
            $('.exit').hide();
            $('.user').hide();
        }
});
function redirect(n) {
  window.location.href=n;
}


