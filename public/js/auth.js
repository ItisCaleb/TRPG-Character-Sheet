document.write("");
$(document).ready(function () {
    const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const pattern = new RegExp("[`~!#$^&*()=\\-|{}\':+;,\\\\\\[\\]<>\\n/?￥…【】‘”“。、%]");
    $('.email-box').on('input',function () {
        const input_box = $(this).parent('.input');
        const email = $(this)
        const check = $(this).siblings('.check');
        if(email.val().length===0){
            check.text('');
            input_box.css("borderBottomColor", '');
        }
        if(email.val().length>=1){
            const email_check =$('#email').val().match(emailRule);
            const result = email.val().match(pattern);
            if(!email_check) {
                input_box.css("borderBottomColor", "#ee6723");
                check.text('無效電子郵件');
                check.css('color', '#ee6723')
            }
            else if(result){
                input_box.css("borderBottomColor", "#ee6723");
                check.text('含有特殊字元');
                check.css('color','#ee6723')
            }
            else {
                input_box.css("borderBottomColor", "#46A3FF");
                check.text('有效');
                check.css('color',"#46A3FF")
            }
        }
    });
    $('.input-box').on('input',function () {
        $(this).each(function () {
            const input_box = $(this).parent('.input');
            const input = $(this)
            const check = $(this).siblings('.check');
            if(input.val().length===0){
                check.text('');
                input_box.css("borderBottomColor", '');
            }
            if(input.val().length >=1){
                const result = input.val().match(pattern);
                if (result) {
                    input_box.css("borderBottomColor", "#ee6723");
                    check.text('含有特殊字元');
                    check.css('color','#ee6723')
                }
                if (!result) {
                    input_box.css("borderBottomColor", "#46A3FF");
                    check.text('有效');
                    check.css('color',"#46A3FF")
                }
            }
        })
    })

    function checkInput(){
        var input=true;
        $('input').each(function () {
            if($(this).val().length===0) {
                bad_message('請輸入資料');
                $('.check-btn').prop('disabled',true);
                input=false;
                setTimeout(function () {
                    $('.check-btn').prop('disabled',false);
                },1000)
                return false
            }
        })
        if(!input) return false
        const email=$('#email').val();
        if(email.length>=1 && !(email.match(emailRule))||email.length===0){
            $('.check-btn').prop('disabled',true);
            bad_message('電子郵件格式錯誤');
            setTimeout(function () {
                $('.check-btn').prop('disabled',false);
            },1000)
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
    $('#login').click( function (e) {
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
    $('#forget_password').click(function (e) {
        e.preventDefault();
        if(checkInput()) {
                $('#forget_password').prop('disabled',true);
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
                            $('#forget_password').prop('disabled',false);
                        },1000)
                    }
                });
            }
    })

});
