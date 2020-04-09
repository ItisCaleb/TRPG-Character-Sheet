document.write();
$(document).ready(function () {
    var sheet={};
    var url = $(location).attr('href')
    var array = url.split('/');
    var id = array[array.length-1];
    setInterval(function () {
        if ($('#url').length > 0) {
            $.ajax({
                url:'../api/sheet/COC7th/json/'+ id,
                type:'GET',
                contentType: 'application/json; charset=UTF-8',
                success:function(data){
                    sheet=JSON.parse(data);
                    for (let i=0;i<Object.keys(sheet).length;i++){
                        delete sheet[Object.keys(sheet)[i]]._id;
                        delete sheet[Object.keys(sheet)[i]].__v;
                    }
                    delete sheet.info.system;
                    delete sheet.info.author;
                    var stat = sheet.stat.characteristic
                    var fellow = sheet.story.fellow_investigator
                    delete sheet.story.fellow_investigator
                    delete sheet.stat.characteristic
                    console.log(sheet)
                    $('.info').each(function (index) {
                        $(this).val(sheet.info[Object.keys(sheet.info)[index]]);
                    })
                    $('.equip').each(function (index) {
                        $(this).val(sheet.equip[Object.keys(sheet.equip)[index]]);
                    })
                    $('.stat').each(function (index) {
                        $(this).val(stat[index]);
                    })
                    $('.status').each(function (index) {
                        $(this).val(sheet.stat[Object.keys(sheet.stat)[index]]);
                    })
                    $('.story').each(function (index) {
                        $(this).val(sheet.story[Object.keys(sheet.story)[index]]);
                    })
                    for (let i=0;i<Object.keys(sheet.skill.skill).length;i++){
                        $('.name').each(function () {
                            if ($(this).text()===sheet.skill.skill[i].name){
                                $(this).siblings().find('.base-input').each(function (index) {
                                    $(this).val(sheet.skill.skill[i].number[index])
                                })
                            }
                        })
                    }

                },
                error:function(){
                  redirect('/charactersheet')
                },
                dataType:'json'
            })
            $('#url').remove();
        }
    },0)
    $('#delete').click(function () {
        $.get('../api/sheet/delete/'+ id,setTimeout(function(){
            redirect('/charactersheet')
        },5 ))
    })
});