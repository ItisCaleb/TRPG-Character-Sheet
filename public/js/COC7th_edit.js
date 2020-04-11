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
                                if (sheet.skill.skill[i].number.length === 4){
                                    $(this).siblings().find('.custom').each(function () {
                                        $(this).val(sheet.skill.skill[i].number[3])
                                    })
                                }
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
    var skill = {}
    var stat = []
    setInterval(function () {
        stat = [];
        $('.chara').each(function () {

            //push the stat's value to array
            $(this).siblings('.stat').each(function () {
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
    })
    setInterval(function () {
        var sheet = $('#myform').serializeArray();

        sheet.push({name:'skill',value:skill});
        sheet.push({name:'stat',value:stat});
        $.ajax({
            url:'../api/sheet/COC7th/edit/'+ id,
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data:JSON.stringify(sheet) ,
            dataType:'json'
        },10000);

    },10000)

    $('#delete').click(function () {
        $.get('../api/sheet/delete/'+ id,setTimeout(function(){
            redirect('/charactersheet')
        },5))
    })
});