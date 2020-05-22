document.write();
$(document).ready(function () {
    var url = $(location).attr('href')
    var array = url.split('/');
    var id = array[array.length-1];
    var skill = {}
    var stat = []
    setInterval(function () {
        stat = [];
        $('.chara').each(function () {

            //push the stat's value to array
            $(this).siblings('label').find('.stat').each(function () {
                stat.push(parseInt($(this).val()));
            });
        });

        //push the skill's value to object
        $('.total').each(function () {

            //push the active skill's value to object
            var name = $(this).siblings('.name').text();
            if(parseInt($(this).text()) > parseInt($(this).siblings('.base').text()) || parseInt($(this).text()) > parseInt($(this).siblings('.base-skill').text()) ) {
                skill[name] = [];
                $(this).siblings().find('.base-input').each(function () {
                    skill[name].push(parseInt($(this).val()));
                });
                $(this).siblings().find('.custom').each(function () {
                    skill[name].push($(this).val());
                });
            }
            if (parseInt($(this).text()) === parseInt($(this).siblings('.base').text()) && parseInt($(this).text()) <= parseInt($(this).siblings('.base-skill').text()))
                delete skill[name];
        });
    });
    $(document).on('change','input',function () {
        if($('#name').val()===''){
            return bad_message('調查員姓名不得為空')
        }
        $('.save-icon').show();
        $('.success-icon').hide();
        setTimeout(function () {
            var form=$('#myform')[0];
            var sheet = new FormData(form);
            sheet.append('skill',JSON.stringify(skill));
            sheet.append('stat',JSON.stringify(stat));
            var image;
            if ($('input[type=file]')[0].files[0]===undefined){
                image=$('#add-image').attr('src')
            }else image=$('input[type=file]')[0].files[0];
            sheet.append('file',image);


            $.ajax({
                url:'../api/sheet/COC7th/edit/'+ id,
                type: 'POST',
                contentType: false,
                processData: false, // required
                data:  sheet,
                success:function (data) {
                    $('.save-icon').hide();
                    $('.success-icon').show();
                },
                error:function (res) {
                    bad_message(res.responseText);
                }
            });
        },2000)
    })

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
