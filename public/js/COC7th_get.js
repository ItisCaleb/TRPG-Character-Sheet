document.write('');
$(document).ready(function () {

    let sheet = {};
    const url = $(location).attr('href');
    const array = url.split('/');
    const id = array[array.length - 1];

    var disabled="";
    var btn='<button class="custom-delete">刪除</button></td>\n';
    var socket;
    if($('#status').data('status')==='view') {
        socket = io();
        socket.emit('join',id);

        disabled="disabled";
        btn="";
    }
    try{
        socket.on('asyncInput',(data)=>{
            if(data.key === 'input' || data.key === 'select'){
                $(`${data.key}[data-${data.key}=${data.index}]`).val(data.payload);
                $('.permissions').each(function () {
                    $(this).removeClass('permissions-choose');
                    if ($(this).text() === $('.permission-status').val()) {
                        $(this).addClass('permissions-choose');
                    }
                });
            }else {
                $(`${data.key}[data-${data.key}=${data.index}]`).text(data.payload);
            }
        });
    }catch (err) {

    }


    if ($('#url').length > 0) {
        $.ajax({
            url: '../api/sheet/COC7th/json/' + id,
            type: 'GET',
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                sheet = JSON.parse(data);
                $('input textarea select').prop('readonly', true);
                const fellow = sheet.story.fellow_investigator;
                const image = sheet.story.avatar;
                (image === '')
                    ? $("#add-image").attr("src", '/public/source/iconmonstr-plus-6.svg')
                    : $("#add-image").attr("src", "data:image/;base64," + image);
                $('.permissions').each(function () {
                    $(this).removeClass('permissions-choose');
                    if ($(this).text() === $('.permission-status').val()) {
                        $(this).addClass('permissions-choose');
                    }
                });
                $('.class-feature').val(sheet.skill.class_feature);
                var number = 0;
                for (let i = 0; i < Object.keys(sheet.skill.skill).length; i++) {
                    let skill = sheet.skill.skill[i];
                    $('.name').each(function () {
                        if ($(this).text().includes(skill.name)) {
                            $(this).siblings().find('.base-input').each(function (index) {
                                $(this).val(skill.number[index])
                            });
                            if (skill.number.length === 4 && !skill.name.includes('自定義技能')) {
                                $(this).siblings().find('.custom').each(function () {
                                    $(this).val(skill.number[3])
                                })
                            }
                        }
                    });

                    if (skill.name.includes('自定義技能')) {
                        const data_number = $('.last').children('.td-input:last').children('input').data('input');
                        $('.last').last().after('<tr class="custom-skill last">\n' +
                            '<td class="custom-name name">自定義技能' + (number + 1) + btn +
                            '<td class="td-input custom-skill-name">' + skill.number[3] + '</td>\n' +
                            '<td class="base base-skill custom-base">' + skill.number[4] + '</td>\n' +
                            '<td class="td-input"><input data-input="'+data_number+1+'"' + disabled + ' value="' + skill.number[0] + '" type="number" max="100" min="0" class="skill base-input class" /></td>\n' +
                            '<td class="td-input"><input data-input="'+data_number+2+'"' + disabled + ' value="' + skill.number[1] + '" type="number" max="100" min="0" class="skill base-input interest " /></td>\n' +
                            '<td class="td-input"><input data-input="'+data_number+3+'"' + disabled + ' value="' + skill.number[2] + '" type="number" max="100" min="-50" class="skill base-input" /></td>\n' +
                            '<td class="total">\n' +
                            '                                            <table>\n' +
                            '                                                <tr>\n' +
                            '                                                    <td rowspan="2" class="max"></td>\n' +
                            '                                                    <td class="hard"></td>\n' +
                            '                                                </tr>\n' +
                            '                                                <tr>\n' +
                            '                                                    <td class="extreme"></td>\n' +
                            '                                                </tr>\n' +
                            '                                            </table>\n' +
                            '                                        </td>\n' +
                            '</tr>')
                        number++;
                    }
                }
                $('input textarea select').prop('readonly', false);
            },
            error: function () {
                redirect('/charactersheet')
            },
            dataType: 'json'
        });
        $('#url').remove();
    }
});