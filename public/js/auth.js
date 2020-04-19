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
                $('#email').siblings('.check').text('電子郵件錯誤');
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
                    check.text('輸入正確');
                    check.css('color',"#46A3FF")
                }
            }
        })
    },0);


});
