document.write('');
$(document).ready(function () {
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
            url: '../api/session/sheet_upload/<%=url%>',
            type: 'POST',
            data:$(this).serializeArray(),
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession/<%=url%>')
                },1000)
            },
            error:function(data){
                bad_message(data.responseText)
            },
        });
    })
    $('.sheet-delete').click(function (e) {
        e.preventDefault()
        $.ajax({
            url:'../api/session/sheetdelete/'+$(this).attr('data-id')+'?session=<%=url%>',
            type:'GET',
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession/<%=url%>')
                },1000)
            },
            error:function(data){
                bad_message(data.responseText)
            },
        })
    })

    $('#delete').click(function (e) {
        e.preventDefault();
        $('#delete-window').css('display','none');
        $.ajax({
            url: '../api/session/delete/<%=url%>',
            type: 'GET',
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/trpgsession')
                },1000)
            },
            error:function(data){
                bad_message(data.responseText)
            },
        });
    })
})