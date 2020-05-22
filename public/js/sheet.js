document.write("");
$(document).ready(function () {
    var choose_value='/charactersheet/create/COC7th'
    $('.systems-title-tile').on('click',function () {
        $('.systems-title-tile').removeClass('systems-choose')
        $(this).addClass('systems-choose')
        if($(this).attr('id')==='choose-coc7th'){
            $('.green-dot').hide();
            $(this).find('.green-dot').show()
            $('#info-dnd5e').hide();
            $('#info-coc7th').show()
            choose_value = '/charactersheet/create/COC7th'
        }
        if($(this).attr('id')==='choose-dnd5e'){
            $('.green-dot').hide();
            $(this).find('.green-dot').show()
            $('#info-coc7th').hide()
            $('#info-dnd5e').show();
            choose_value = '/charactersheet/create/DND5e'
        }
    })
    $('#create-button').on('click',function () {
        get(choose_value)
    })
})