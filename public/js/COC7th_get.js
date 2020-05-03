document.write('');
$(document).ready(function () {
    var sheet={};
    var url = $(location).attr('href');
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
                    delete sheet.info.session;
                    var stat = sheet.stat.characteristic;
                    var fellow = sheet.story.fellow_investigator;
                    var image = sheet.story.avatar;
                    delete sheet.story.fellow_investigator;
                    delete sheet.stat.characteristic;
                    delete sheet.story.avatar;

                    $('.info').each(function (index) {
                        $(this).val(sheet.info[Object.keys(sheet.info)[index]]);
                    });
                    $('.equip').each(function (index) {
                        $(this).val(sheet.equip[Object.keys(sheet.equip)[index]]);
                    });
                    $('.stat').each(function (index) {
                        $(this).val(stat[index]);
                    });
                    //prevent hp and san from getting 0
                    $('.status').each(function (index) {
                        $(this).val(sheet.stat[Object.keys(sheet.stat)[index]]);
                    });
                    $('.story').each(function (index) {
                        $(this).val(sheet.story[Object.keys(sheet.story)[index]]);
                    });
                    (image==='')?$("#add-image").attr("src",'/public/source/iconmonstr-plus-6.svg'):$("#add-image").attr("src","data:image/;base64,"+image);

                    $('.permissions').each(function () {
                        $(this).removeClass('permissions-choose');
                        if ($(this).text()===$('.permission-status').val()){
                            $(this).addClass('permissions-choose');
                        }
                    })
                    $('.class-feature').val(sheet.skill.class_feature);
                    for (let i=0;i<Object.keys(sheet.skill.skill).length;i++){
                        $('.name').each(function () {
                            if ($(this).text()===sheet.skill.skill[i].name){
                                $(this).siblings().find('.base-input').each(function (index) {
                                    $(this).val(sheet.skill.skill[i].number[index])
                                });
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
            });
            $('#url').remove();
        }
    },0)
});