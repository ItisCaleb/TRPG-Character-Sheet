document.write("");
$(document).ready(function () {
        $(".btn").hover(function () {
            $(this).css({"color": "#46A3FF", "borderBottomColor": "#46A3FF"})
        }, function () {
            $(this).css({"color": "", "borderBottomColor": ""})
        });
        if (document.cookie.indexOf("auth-token")>=0){
            $('.subbtn.btn.validation').hide();
            $('.exit').click(function () {
                Cookies.remove('auth-token');
            });
        }else{
            $('.exit').hide();
        }
});
function redirect(n) {
  window.location.href=n;
}


