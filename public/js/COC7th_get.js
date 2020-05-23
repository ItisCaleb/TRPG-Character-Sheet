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
                    var number=0;
                    for (let i=0;i<Object.keys(sheet.skill.skill).length;i++){
                        let skill =sheet.skill.skill[i];
                        $('.name').each(function () {
                            if ($(this).text()===skill.name){
                                $(this).siblings().find('.base-input').each(function (index) {
                                    $(this).val(skill.number[index])
                                });
                                if (skill.number.length === 4 && !skill.name.match('自定義技能')){
                                    $(this).siblings().find('.custom').each(function () {
                                        $(this).val(skill.number[3])
                                    })
                                }
                            }
                        })

                        if(skill.name.match('自定義技能')){

                            $('tr').last().prev().after('<tr class="custom-skill">\n' +
                                '<td class="custom-name name">自定義技能'+number+'<button class="custom-delete">刪除</button></td>\n' +
                                '<td class="td-input custom-skill-name">'+skill.number[3]+'</td>\n' +
                                '<td class="base base-skill custom-base">'+skill.number[4]+'</td>\n' +
                                '<td class="td-input"><input value="'+skill.number[0] +'" type="number" max="100" min="0" class="skill base-input class" /></td>\n' +
                                '<td class="td-input"><input value="'+skill.number[1] +'" type="number" max="100" min="0" class="skill base-input interest " /></td>\n' +
                                '<td class="td-input"><input value="'+skill.number[2] +'" type="number" max="100" min="-50" class="skill base-input" /></td>\n' +
                                '<td class="total"></td>\n' +
                                '</tr>')
                            number++;
                        }
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