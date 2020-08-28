document.write("");
$(document).ready(function () {
    var choose_value = 'COC7th'
    $('.systems-title-tile').on('click', function () {
        $('.systems-title-tile').removeClass('systems-choose')
        $(this).addClass('systems-choose')
        if ($(this).attr('id') === 'choose-coc7th') {
            $('.green-dot').hide();
            $(this).find('.green-dot').show()
            $('#info-dnd5e').hide();
            $('#info-coc7th').show()
            choose_value = 'COC7th'
        }
        if ($(this).attr('id') === 'choose-dnd5e') {
            $('.green-dot').hide();
            $(this).find('.green-dot').show()
            $('#info-coc7th').hide()
            $('#info-dnd5e').show();
            choose_value = 'DND5e'
        }
    })
    $('#create-button').on('click', function (e) {
        e.preventDefault();
        const name = $('#name').val();
        console.log(name)
        if(name == null || name==='') {
            $('#name').after('<br><span id="error" style="color: red;font-size: 16px;">請輸入名稱</span><br>');
            return ;
        }
        $.ajax({
            url:`/api/sheet/${choose_value}/create/${name}`,
            type:'GET',
            success:function(data){
                good_message('角色卡創建成功!')
                setTimeout(function(){
                    redirect(`/charactersheet/${data}`);
                },1000)
            },
            error:function(data){
                bad_message(data.responseText);
                setTimeout(function () {
                    $('.player-delete').prop('disabled',false);
                },1000)
            },

        })
    })
})