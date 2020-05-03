document.write('');
$(document).ready(function () {
    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length-1];
    $('#upload').click(function () {
        $('#upload-window').show()
    })
    $('#sheet-show').click(function () {
        $('#sheet-window').show();
    })
    $('#delete-check').click(function () {
        $('#delete-window').show();
    })
    $('#delete-disable').click(function () {
        $('#delete-window').hide();
    })
    $('#sheet-disable').click(function () {
        $('#sheet-window').hide()
    })
    $('#upload-disable').click(function () {
        $('#upload-window').hide()
    })
    $('#upload-sheet-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '../api/session/sheet_upload/'+id,
            type: 'POST',
            data:$(this).serializeArray(),
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession/'+id)
                },1000)
            },
            error:function(data){
                bad_message(data.responseText)
            },
        });
    })
    $('.sheet-delete').click(function (e) {
        e.preventDefault()
        $('.sheet-delete').prop('disabled',true);
        $.ajax({
            url:'../api/session/sheetdelete/'+$(this).attr('data-id')+'?session='+id,
            type:'GET',
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession/'+id)
                },1000)
            },
            error:function(data){
                bad_message(data.responseText);
                setTimeout(function () {
                    $('.sheet-delete').prop('disabled',false);
                },1000)
            },
        })
    })

    $('#delete').click(function (e) {
        e.preventDefault();
        $('#delete').prop('disabled',true);
        $('#delete-window').css('display','none');
        $.ajax({
            url: '../api/session/delete/'+id,
            type: 'GET',
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession')
                },1000)
            },
            error:function(data){
                bad_message(data.responseText)
                setTimeout(function () {
                    $('#delete').prop('disabled',false);
                },1000)
            },
        });
    })
})