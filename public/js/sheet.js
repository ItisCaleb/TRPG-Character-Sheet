document.write("");
$(document).ready(function () {
    var choose_value='/charactersheet/create/COC7th'
    $('.systems-title-tile').click(function () {
        $('.systems-title-tile').removeClass('systems-choose')
        $(this).addClass('systems-choose')
        if($(this).attr('id')==='choose-coc7th'){
            $('#info-dnd5e').hide();
            $('#info-coc7th').show()
            choose_value = '/charactersheet/create/COC7th'
        }
        if($(this).attr('id')==='choose-dnd5e'){
            $('#info-coc7th').hide()
            $('#info-dnd5e').show();
            choose_value = '/charactersheet/create/DND5e'
        }
    })
    $('#create-button').click(function () {
        get(choose_value)
    })
})