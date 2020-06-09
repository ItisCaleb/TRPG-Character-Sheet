document.write();
$(document).ready(function () {
    var url = $(location).attr('href')
    var array = url.split('/');
    var id = array[array.length-1];
    $('.delete-check').on('click',function () {
        $('#delete-window').css('display','block');
    });
    $('#delete-disable').on('click',function () {
        $('#delete-window').css('display','none');
    });
    $('#delete').on('click',function () {
        $('#delete-window').css('display','none');
        $.ajax({
            url:'../api/sheet/delete/'+ id,
            type:'DELETE',
            success:function(data) {
                good_message(data)
                setTimeout(function () {
                    redirect('/charactersheet')
                }, 1000)
            }
        })
    })
});