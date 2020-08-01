document.write();
$(document).ready(function () {
    const socket=io();

    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length-1];

    socket.emit('join',id);
    socket.on('asyncInput',(data)=>{
        if(data.key === 'input'){
            let input=$(`${data.key}[data-${data.key}=${data.index}]`);
            input.val(data.payload);
            if(input.attr('type')==='checkbox' && data.payload ==='yes'){
                input.prop('checked',true);
            }else if  (input.attr('type')==='checkbox'){
                input.prop('checked',false);
            }
            $('.permissions').each(function () {
                $(this).removeClass('permissions-choose');
                if ($(this).text() === $('.permission-status').val()) {
                    $(this).addClass('permissions-choose');
                }
            });
        }else {
            $(`${data.key}[data-${data.key}=${data.index}]`).text(data.payload);
        }
        sheetSetup()
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
                good_message(data)
                setTimeout(function () {
                    redirect('/charactersheet')
                }, 1000)
            }
        })
    });

    $(document).on('change',':input:not([type=button]):not([type=range]), textarea',function () {
        if($('#name').val()===''){
            return bad_message('冒險者姓名不得為空')
        }
        $('.save-icon').show();
        $('.success-icon').hide();
        var payload;
        if($(this).is('input')) payload =$(this).val();
        else if($(this).is('textarea')) payload = $(this).text();
        const input = {
            url:id,
            key:Object.keys($(this).data())[0],
            index:$(this).data(Object.keys($(this).data())[0]),
            payload:payload
        };
        socket.emit('input',input);
        setTimeout(function () {
            const calSheet =sheetPush();
            const spell =calSheet.spell;
            const skill =calSheet.skill;
            const money =calSheet.money;
            const stat =calSheet.stat;
            const attack=calSheet.attack;
            const death_save=calSheet.death_save;
            var sheet = $('#myform').serializeArray();
            sheet.push({name:'skill',value:JSON.stringify(skill)});
            sheet.push({name:'spell',value:JSON.stringify(spell)});
            sheet.push({name:'money',value:JSON.stringify(money)});
            sheet.push({name:'stat',value:JSON.stringify(stat)});
            sheet.push({name:'attack',value:JSON.stringify(attack)});
            sheet.push({name:'death_save',value:JSON.stringify(death_save)});
            $.ajax({
                url:'../api/sheet/DND5e/edit/'+ id,
                type: 'POST',
                data:  $.param(sheet),
                success:function (data) {
                    $('.save-icon').hide();
                    $('.success-icon').show();
                },
                error:function (res) {
                    bad_message(res.responseText);
                }
            });
        },2000)
    });
    $('#save').on('click',function (e){
        e.preventDefault();
        if($('input[type=file]')[0].files[0]===undefined){
            $('#error-image').remove();
            $('#add-image').parent('label').append('<p id="error-image" style="color: red;font-size: 10px">你並沒有上傳任何圖片或改變任何東西!</p>')
        }else {
            $('#error-image').remove();
            const data=new FormData;
            data.append('file',$('input[type=file]')[0].files[0]);
            $.ajax({
                url:'../api/sheet/DND5e/image/'+ id,
                type: 'POST',
                contentType: false,
                processData: false, // required
                data:  data,
                success:function (data) {
                    $('#add-image').parent('label').append('<p id="error-image" style="color: greenyellow;font-size: 10px">圖片儲存成功!</p>')
                },
                error:function (res) {
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
            url:'../api/sheet/DNDE5e/image/'+ id,
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
    })
});