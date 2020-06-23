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
    function sheetPush() {
        var skill=[];
        var spell={0:{},1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}};
        $('.skill').each(function () {
            const input = $(this).siblings('label');
            if($(this).siblings('label').find('input').val()==='yes'){
                skill.push(input.text())
            }
        })
        var stat =[];
        $('.base-attr').each(function () {
            stat.push($(this).val());
        })

        $('.spell-level').each(function (index) {
            spell[index]["number"]=[];
            spell[index]["spells"]={};
            $(this).siblings('label').find('.spell-number').each(function () {
                spell[index]["number"].push($(this).val());
            });
            $(this).parent().siblings().children('label').each(function (i) {
                if ($(this).children('.spell-name').val()!==("")){
                    const name=$(this).children('.spell-name').val();
                    spell[index]["spells"][name]=($(this).children('.check-input').val());
                }
            })
        })
        var attack=[];
        $('.attack').each(function () {
            attack.push($(this).val());
        })
        var money=[];
        $('.money').each(function () {
            money.push($(this).val());
        })
        this.spell=spell;
        this.skill=skill;
        this.money=money;
        this.stat=stat;
        this.attack=attack;
        return this;
    }
    $(document).on('change','input[type=text], input[type=number], textarea,select',function () {
        if($('#name').val()===''){
            return bad_message('冒險者姓名不得為空')
        }
        $('.save-icon').show();
        $('.success-icon').hide();
        setTimeout(function () {
            const calSheet =sheetPush();
            const spell =calSheet.spell;
            const skill =calSheet.skill;
            const money =calSheet.money;
            const stat =calSheet.stat;
            const attack=calSheet.attack;
            var sheet = $('#myform').serializeArray();
            sheet.push('skill',JSON.stringify(skill));
            sheet.push('spell',JSON.stringify(spell));
            sheet.push('money',JSON.stringify(money));
            sheet.push('stat',JSON.stringify(stat));
            sheet.push('attack',JSON.stringify(attack));
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
    })
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
    })
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