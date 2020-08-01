document.write();
$(document).ready(function () {
    const socket = io();

    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length-1];
    socket.emit('join',id);
    socket.on('asyncInput',(data)=>{
       console.log(data);
       if(data.key === 'input' || data.key === 'select'){
           $(`${data.key}[data-${data.key}=${data.index}]`).val(data.payload);
       }else {
           $(`${data.key}[data-${data.key}=${data.index}]`).text(data.payload);
       }
    });
    $(document).on('click', '.custom-delete', function (e) {
        e.preventDefault();
        $('input').first().trigger('change');
    });
    $(document).on('change',':input:not([type=button]):not([type=range]):not(.no-update), textarea, select',function () {
        if($('#name').val()===''){
            return bad_message('調查員姓名不得為空')
        }
        var payload;
        if($(this).is('input') || $(this).is('select')) payload =$(this).val();
        else if($(this).is('textarea')) payload = $(this).text();
        const input = {
            url:id,
            key:Object.keys($(this).data())[0],
            index:$(this).data(Object.keys($(this).data())[0]),
            payload:payload
        };
        socket.emit('input',input);
        $('.save-icon').show();
        $('.success-icon').hide();
        setTimeout(function () {
            var sheet= $('#myform').serializeArray();
            const skill =sheetPush().skill;
            const stat =sheetPush().stat;
            sheet.push({name:'skill',value:JSON.stringify(skill)});
            sheet.push({name:'stat',value:JSON.stringify(stat)});
            $.ajax({
                url:'../api/sheet/COC7th/edit/'+ id,
                type: 'POST',
                data: $.param(sheet) ,
                success:function () {
                    $('.save-icon').hide();
                    $('.success-icon').show();
                },
                error:function (res) {
                    bad_message(res.responseText);
                }
            });
        },2000)
    });
    $('#save').on('click', function (e) {
        e.preventDefault();
        if ($('input[type=file]')[0].files[0] === undefined) {
            $('#error-image').remove();
            $('#add-image').parent('label').append('<p id="error-image" style="color: red;font-size: 10px">你並沒有上傳任何圖片或改變任何東西!</p>')
        } else {
            $('#error-image').remove();
            const data = new FormData;
            data.append('file', $('input[type=file]')[0].files[0]);
            $.ajax({
                url: '../api/sheet/COC7th/image/' + id,
                type: 'POST',
                contentType: false,
                processData: false, // required
                data: data,
                success: function (data) {
                    $('#add-image').parent('label').append('<p id="error-image" style="color: greenyellow;font-size: 10px">圖片儲存成功!</p>')
                },
                error: function (res) {
                    bad_message(res.responseText);
                }
            });
        }
    });
    $('#cancel-image').on('click',function (e){
        e.preventDefault();
        $('#error-image').remove();
        const data=new FormData;
        data.append('file',$('input[type=file]')[0].files[0]);
        $.ajax({
            url:'../api/sheet/COC7th/image/'+ id,
            type: 'POST',
            contentType: false,
            processData: false, // required
            data:  data,
            success:function (data) {
                $('#add-image').parent('label').append('<p id="error-image" style="color: greenyellow;font-size: 10px">圖片已刪除!</p>')
                },
            error:function (res) {
                bad_message(res.responseText);
            }
        });
    });

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
                good_message(data);
                setTimeout(function () {
                    redirect('/charactersheet')
                }, 1000)
            }
        })
    })

});
