document.write('');
$(document).ready(function () {
    var sheet={};
    var url = $(location).attr('href');
    var array = url.split('/');
    var id = array[array.length-1];
    function sheetCalculate () {
        //calculate the sum of the stat
        var str = parseInt(($('#str').text(sum_up($('#str-bas').val(), $('#str-adj').val()))).text());
        var con = parseInt(($('#con').text(sum_up($('#con-bas').val(), $('#con-adj').val()))).text());
        var dex = parseInt(($('#dex').text(sum_up($('#dex-bas').val(), $('#dex-adj').val()))).text());
        var app = parseInt(($('#app').text(sum_up($('#app-bas').val(), $('#app-adj').val()))).text());
        var pow = parseInt(($('#pow').text(sum_up($('#pow-bas').val(), $('#pow-adj').val()))).text());
        var siz = parseInt(($('#siz').text(sum_up($('#siz-bas').val(), $('#siz-adj').val()))).text());
        var int = parseInt(($('#int').text(sum_up($('#int-bas').val(), $('#int-adj').val()))).text());
        var edu = parseInt(($('#edu').text(sum_up($('#edu-bas').val(), $('#edu-adj').val()))).text());
        $('#hp-max').text(Math.floor(sum_up(con, siz) / 10));
        $('#mp-max').text(Math.floor(pow / 5));
        $('#san-max').text(sum_up(99, -$('#san-minus').text()));
        var class_feature = $('.class-feature').val()
        $('.class-point').text(function () {
            var sum
            if (class_feature === 'EDU')
                sum = 4 * (edu);
            if (class_feature === 'EDU+STR')
                sum = 2 * (edu + str);
            if (class_feature === 'EDU+DEX')
                sum = 2 * (edu + dex);
            if (class_feature === 'EDU+APP')
                sum = 2 * (edu + app);
            if (class_feature === 'EDU+POW')
                sum = 2 * (edu + pow);
            $('.class').each(function () {
                sum -= $(this).val()
            })
            return '剩餘職業點數：' + sum
        })
        $('.interest-point').text(function () {
            var sum = int * 2
            $('.interest').each(function () {
                sum -= $(this).val()
            })
            return '剩餘興趣點數：' + sum
        })
        //calculate the origin value of these specific skills
        $('#dodge').text(Math.floor(dex / 2));
        $('#mother-language').text(edu);

        //calculate mov value
        if (dex < siz || str < siz)
            $('#mov').text('7');
        if (dex >= siz || str >= siz)
            $('#mov').text('8');
        if (dex > siz && str > siz)
            $('#mov').text('9');

        //calculate db and build value
        if (str + siz < 2)
            $('#build').text('請填寫完整屬性');
        if (str + siz >= 2 && str + siz <= 64)
            $('#build').text('-2 & -2');
        if (str + siz >= 65 && str + siz <= 84)
            $('#build').text('-1 & -1');
        if (str + siz >= 85 && str + siz <= 124)
            $('#build').text('0 & 0');
        if (str + siz >= 125 && str + siz <= 164)
            $('#build').text('+1d4 & 1');
        if (str + siz >= 165 && str + siz <= 204)
            $('#build').text('+1d6 & 2');
        if (str + siz >= 205 && str + siz <= 284)
            $('#build').text('+2d6 & 3');
        if (str + siz >= 285)
            $('#build').text(Math.floor((((str + siz) - 205) / 80) + 2) + 'd6 & ' + Math.floor((((str + siz) - 205) / 80) + 3));


        $('.attr-add').each(function () {
            if ($(this).val() > 99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String)
                $(this).val(0);
            if ($(this).val() < -50)
                $(this).val(-50);
        });
        $('.attr').each(function () {
            if ($(this).val() > 99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String)
                $(this).val(0);
            if ($(this).val() < 0)
                $(this).val(0);
        });
        $('.skill').each(function () {
            if ($(this).val() > 99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String)
                $(this).val(0);
            if ($(this).val() < 0)
                $(this).val(0);
        });
        if (parseInt($('#hp').val()) > parseInt($('#hp-max').text()) || parseInt($('#hp').val()) < 0)
            $('#hp').val($('#hp-max').text());
        if (parseInt($('#mp').val()) > parseInt($('#mp-max').text()) || parseInt($('#mp').val()) < 0)
            $('#mp').val($('#mp-max').text());
        if (parseInt($('#san').val()) > parseInt($('#san-max').text()))
            $('#san').val($('#san-max').text());
        if (parseInt($('#luk').val()) > 99 || parseInt($('#luk').val()) < 0)
            $('#luk').val(99);

        //async slider's number and input's
        $('.add-number').text(parseInt($('#add-slider').val()))

        //calculate the sum of skill's value
        $('.total').each(function () {
            var sum = 0;
            $(this).siblings().find('.base-input').each(function () {
                sum += parseInt($(this).val());
            });
            sum += parseInt($(this).siblings('.base').text());
            $(this).siblings().find('.add-menu').find('#total').text(sum)
            $(this).find('.max').text(sum);
            $(this).find('.hard').text(Math.floor(sum/2));
            $(this).find('.extreme').text(Math.floor(sum/5));
        })
    }
    if ($('#url').length > 0) {
            $.ajax({
                url:'../api/sheet/COC7th/json/'+ id,
                type:'GET',
                contentType: 'application/json; charset=UTF-8',
                success:function(data){
                    sheet=JSON.parse(data);
                    $('input textarea select').prop('readonly',true);
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
                                '<td class="custom-name name">自定義技能'+(number+1)+'<button class="custom-delete">刪除</button></td>\n' +
                                '<td class="td-input custom-skill-name">'+skill.number[3]+'</td>\n' +
                                '<td class="base base-skill custom-base">'+skill.number[4]+'</td>\n' +
                                '<td class="td-input"><input value="'+skill.number[0] +'" type="number" max="100" min="0" class="skill base-input class" /></td>\n' +
                                '<td class="td-input"><input value="'+skill.number[1] +'" type="number" max="100" min="0" class="skill base-input interest " /></td>\n' +
                                '<td class="td-input"><input value="'+skill.number[2] +'" type="number" max="100" min="-50" class="skill base-input" /></td>\n' +
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
                    sheetCalculate();
                    $('input textarea select').prop('readonly',false);
                },
                error:function(){
                    redirect('/charactersheet')
                },
                dataType:'json'
            });
            $('#url').remove();
        }
});