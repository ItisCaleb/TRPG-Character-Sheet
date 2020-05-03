document.write("");
$(document).ready(function () {
    setInterval(function () {
        $('.input').each(function () {
            const input = $(this).find('.input-box');
            const check = $(this).find('.check');
            if(input.val().length===0){
                check.text('');
            }
            if($('#email').val().length>=1 && !($('#email').val().match(new RegExp('[@]')))){
                $('#email').parent('.input') .css("borderBottomColor", "#ee6723");
                $('#email').siblings('.check').text('無效電子郵件');
                $('#email').siblings('.check').css('color','#ee6723')
            }
            if(input.val().length >=1){
                const pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~!#￥……&*()——|{}【】‘;:”“'。,、?%]");
                const result = input.val().match(pattern);
                if (result) {
                    $(this).css("borderBottomColor", "#ee6723");
                    check.text('含有特殊字元');
                    check.css('color','#ee6723')
                }
                if (!result) {
                    $(this).css("borderBottomColor", "#46A3FF");
                    check.text('有效');
                    check.css('color',"#46A3FF")
                }
            }
        })
    },0);
    function checkInput(){
        var input=true;
        $('.input-box').each(function () {
            if($(this).val().length===0) {
                bad_message('請輸入資料');
                input=false;
            }
        })
        if(!input) return false
        const email=$('#email').val();
        if(email.length>=1 && !(email.match(new RegExp('[@]')))||email.length===0){
            bad_message('請輸入完整的電子郵件');
            return false
        }
        return true
    }
    $('#signup').click(function (e) {
        e.preventDefault();
        if(checkInput()) {
            if (!check()) {
                $('#signup').prop('disabled',true);
                if ($('#password').val() !== $('#repassword').val()) {
                    bad_message('重新輸入密碼有誤')
                }
                if ($('#password').val() === $('#repassword').val()) {
                    $.ajax({
                        url: $('#form').attr("action"),
                        type: 'POST',
                        data: $('#form').serializeArray(),
                        success: function (data) {
                            good_message(data)
                            setTimeout(function () {
                                redirect('/login')
                            }, 1000)
                        },
                        error: function (data) {
                            bad_message(data.responseText)
                            setTimeout(function () {
                                $('#signup').prop('disabled',false);
                            },1000)
                        },
                    });
                }
            }
        }
    })
    $('#login').click(async function (e) {
        e.preventDefault();
        if(checkInput()) {
            if (!check()) {
                $('#login').prop('disabled',true);
                $.ajax({
                    url: $('#form').attr("action"),
                    type: 'POST',
                    data: $('#form').serializeArray(),
                    success:function (data) {
                        good_message(data)
                        setTimeout(function () {
                            redirect('/')
                        }, 1000)
                    },
                    error: function (data) {
                        bad_message(data.responseText)
                        setTimeout(function () {
                            $('#login').prop('disabled',false);
                        },1000)
                    }
                });
            }
        }
    })
});
