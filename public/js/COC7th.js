document.write();
$(document).ready(function () {
    setTimeout(function () {
        sheetCalculate()
    },300);
    optionSetup();
    setInterval(function () {
        $('td').children('input').each(function () {
            $(this).css('height',$(this).parent().css('height'));
        })
    },0);
    //repeat

    $(document).on('input click','input',function () {
        sheetCalculate();
    });
    $(document).on('change', '.class-feature', function () {
        $('.class-feature').val($(this).val());
        skillSet()
    });
    $(document).on('input', '#add-slider', function () {
        $(this).parent('.add-menu').siblings('.skill').val($(this).val());
        skillSet()
    });
    $(document).on('change', '#add-slider', function () {
        $(this).parent('.add-menu').siblings('.skill').trigger('change');
    });
    $(document).on('input','.skill',function () {
        $(this).siblings('.add-menu').find('#add-slider').val($(this).val());
        skillSet()
    });
    $(document).on('mousedown', '#add', function () {
        var sum=parseInt($(this).siblings('#add-slider').val()) +1;
        $(this).siblings('#add-slider').val(sum);
        $(this).parent('.add-menu').siblings('.skill').val(sum);
    });
    $(document).on('mousedown', '#minus', function () {
        var sum=parseInt($(this).siblings('#add-slider').val()) -1;
        $(this).siblings('#add-slider').val(sum);
        $(this).parent('.add-menu').siblings('.skill').val(sum);
    });
    $(document).on('click','.custom-delete',function (e) {
        e.preventDefault();
        $(this).closest('tr').remove();
        var number=0;
        $('.custom-name').each(function () {
            $(this).html('自定義技能'+(number+1)+'<button class="custom-delete">刪除</button>');
            number++;
        })
    });

    $('.custom-add').on('click',function () {
        const number=$('.custom-skill').length;
        const name=$(this).siblings('td').find("input[type=text]");
        const origin=$(this).siblings('td').find("input[type=number]");
        if(name.val() !=='' && number<20){
            const data_number = $('.last').children('.td-input:last').children('input').data('input');
            $(this).parent().children().first().html('增加自定義技能');
            $(this).parent().prev().after('<tr class="custom-skill">\n' +
                '<td class="custom-name name">自定義技能'+(number+1)+'<button class="custom-delete">刪除</button></td>\n' +
                '<td class="td-input custom-skill-name ">'+name.val()+'</td>\n' +
                '<td class="base base-skill custom-base">'+origin.val()+'</td>\n' +
                '<td class="td-input"><input data-input="'+data_number+1+'" type="number" max="100" min="0" class="skill base-input class" /></td>\n' +
                '<td class="td-input"><input data-input="'+data_number+2+'" type="number" max="100" min="0" class="skill base-input interest " /></td>\n' +
                '<td class="td-input"><input data-input="'+data_number+3+'" type="number" max="100" min="-50" class="skill base-input" /></td>\n' +
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
                '</tr>');
            name.val('');
            origin.val(0);
            $('input').first().trigger('change');
            sheetCalculate();
        }else if(name.val()===''){
            $(this).parent().children().first().html('增加自定義技能<p style="color: red;display: inline">(請輸入名稱)</p>');
        }else {
            $(this).parent().children().first().html('增加自定義技能<p style="color: red;display: inline">(自定義技能已達到上限)</p>');
        }
    });

    //easy adding slider
    $(document).on('click','.skill',function () {
        if($(this).prop('readonly')===true) return ;
        $('.slider-pop').remove();
        var name;
        if($(this).parent().siblings('.td-input').find('.custom').length>0){
            name =$(this).parent().siblings('.td-input').find('.custom').val()
        }else if($(this).parent().siblings('.custom-skill-name').length>0){
            name =$(this).parent().siblings('.custom-skill-name').text()
        }else {
            name =$(this).parent().siblings('.name').text()
        }
        $(this).parent('.td-input').append('<div class="add-menu slider-pop">\n' +
            '                                            <p style="margin: 0" id="total"></p>'+
            '                                            <p style="margin: 0">'+ name+'</p>'+
            '                                            <input type="button"  id="add"><br>\n' +
            '                                            <input type="range" min="0" max="99" id="add-slider" class="slider-input">\n' +
            '                                            <p class="add-number"></p><br>\n' +
            '                                            <input type="button" id="minus">\n' +
            '                                        </div>')
        $('#add-slider').val($(this).val());
        sheetCalculate();
    });

    //slider pop
    $(document).on('mouseup',function (e) {
        var container = $(".slider-pop");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.remove();
        }
    });
    //roll
    $('.dice').on('click',function () {
        $(this).siblings('label').find('.attr').val(getRandom(3, 18) * 5)
    });
    //roll
    $(".2d6dice").on('click',function () {
        $(this).siblings('label').find('.attr').val((getRandom(3, 12) + 6) * 5)
    });

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    $('#cancel-image').on('click',function (e) {
        e.preventDefault();
        if($('#image').val()!=='' || $('#add-image').attr('src') !=='/public/source/iconmonstr-plus-6.svg') {
            $('#image').val('');
            $('#add-image').attr('src', '/public/source/iconmonstr-plus-6.svg')
        }
    });
    $('ul.tabs li').on('click',function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });


    $(document).on('change','#image',function (inp) {
        var input=inp.currentTarget;
        if (input.files && input.files[0]) {
            $('#error-image').remove();
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            const size=(input.files[0].size/1024);
            console.log(size +"kb");
            if(size>=500){
                $('#add-image').parent('label').append('<p id="error-image" style="color: red;font-size: 10px">檔案過大!請上傳小於500kb的圖像</p>')
                $('#image').val('');
            }else{
                reader.onload = function (e) {
                    $('#add-image').attr('src', e.target.result)
                };
            }
        }
    });

    //add stat's and skill's value to the form
    $(document).on("click", ".create", function (e) {
        e.preventDefault();
        $('.create').prop('disabled',true);
        var form=$('#myform')[0];
        var sheet = new FormData(form);
        const skill = sheetPush().skill;
        const stat = sheetPush().stat;
        sheet.append('skill',JSON.stringify(skill) );
        sheet.append('stat',JSON.stringify(stat) );
        sheet.append('file',$('input[type=file]')[0].files[0]);

        $.ajax({
            url: "../../api/sheet/COC7th",
            type: 'POST',
            contentType: false,
            processData: false, // required
            data:  sheet,
            success: function (data) {
                good_message(data)
                setTimeout(function () {
                    redirect('/charactersheet');
                }, 1000)
            }, error: function (data) {
                bad_message(data.responseText);
                setTimeout(function () {
                    $('.create').prop('disabled',false);
                },1000)
            }
        });
    });
});

function sum_up(bas, adj) {
    return parseInt(bas, 10) + parseInt(adj, 10)
}
function optionSetup (){
    $('#mobile-option').on('click',function () {
        $('.mobile-nav-menu') .show();
    });
    $('.list-button').on('click',function () {
        $('.left-list-menu').show();
    });
    $('.mobile-permission').on('click',function () {
        $('.mobile-permission-menu').show();
    });
    $('.permission').on('click',function () {
        $('.right-list-menu').show();
    });
    $('.permissions').on('click',function () {
        $('.permissions').removeClass('permissions-choose');
        $(this).addClass('permissions-choose');
        $('.permission-status').val($(this).text()).trigger('change')
    })
}
function sheetCalculate () {
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

    if (parseInt($('#hp').val()) > parseInt($('#hp-max').text()) || parseInt($('#hp').val()) < 0)
        $('#hp').val($('#hp-max').text());
    if (parseInt($('#mp').val()) > parseInt($('#mp-max').text()) || parseInt($('#mp').val()) < 0)
        $('#mp').val($('#mp-max').text());
    if (parseInt($('#san').val()) > parseInt($('#san-max').text()))
        $('#san').val($('#san-max').text());
    if (parseInt($('#luk').val()) > 99 || parseInt($('#luk').val()) < 0)
        $('#luk').val(99);
    //calculate the sum of the stat
    let str = parseInt(($('#str').text(sum_up($('#str-bas').val(), $('#str-adj').val()))).text());
    let con = parseInt(($('#con').text(sum_up($('#con-bas').val(), $('#con-adj').val()))).text());
    let dex = parseInt(($('#dex').text(sum_up($('#dex-bas').val(), $('#dex-adj').val()))).text());
    let pow = parseInt(($('#pow').text(sum_up($('#pow-bas').val(), $('#pow-adj').val()))).text());
    let siz = parseInt(($('#siz').text(sum_up($('#siz-bas').val(), $('#siz-adj').val()))).text());
    $('#hp-max').text(Math.floor(sum_up(con, siz) / 10));
    $('#mp-max').text(Math.floor(pow / 5));


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
    skillSet()

}
function skillSet(){
    $('.skill').each(function () {
        if ($(this).val() > 99)
            $(this).val(99);
        if ($(this).val() === '' || $(this).val() === String)
            $(this).val(0);
        if ($(this).val() < 0)
            $(this).val(0);
    });

    let str = parseInt(($('#str').text(sum_up($('#str-bas').val(), $('#str-adj').val()))).text());
    let dex = parseInt(($('#dex').text(sum_up($('#dex-bas').val(), $('#dex-adj').val()))).text());
    let app = parseInt(($('#app').text(sum_up($('#app-bas').val(), $('#app-adj').val()))).text());
    let pow = parseInt(($('#pow').text(sum_up($('#pow-bas').val(), $('#pow-adj').val()))).text());
    let int = parseInt(($('#int').text(sum_up($('#int-bas').val(), $('#int-adj').val()))).text());
    let edu = parseInt(($('#edu').text(sum_up($('#edu-bas').val(), $('#edu-adj').val()))).text());
    var class_feature = $('.class-feature').val();


    $('#san-max').text(sum_up(99, -$('#san-minus').text()));

    //calculate the origin value of these specific skills
    $('#dodge').text(Math.floor(dex / 2));
    $('#mother-language').text(edu);

    $('.class-point').text(function () {
        var sum;
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
        });
        return '剩餘職業點數：' + sum
    });
    $('.interest-point').text(function () {
        var sum = int * 2;
        $('.interest').each(function () {
            sum -= $(this).val()
        });
        return '剩餘興趣點數：' + sum
    });
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
function sheetPush(){
    //push the stat's value to array
    var stat = [];
    var skill={};
    $('.chara').each(function () {
        //make sure the total value of stat won't below 0
        if (parseInt($(this).text()) < 0) {
            $(this).siblings('.attr-add').val(function () {
                return parseInt($(this).val()) + 1
            });
        }
        //push the stat's value to array
        $(this).siblings('label').find('.stat').each(function () {
            stat.push(parseInt($(this).val()));
        });
    });
    //push the skill's value to object
    $('.total').each(function () {

        //push the active skill's value to object
        var name = $(this).siblings('.name').text();
        if (parseInt($(this).text()) > parseInt($(this).siblings('.base').text())
            || parseInt($(this).text()) > parseInt($(this).siblings('.base-skill').text())
            || $(this).siblings('.custom-skill-name').length>0) {
            skill[name] = [];
            $(this).siblings().find('.base-input').each(function () {
                skill[name].push(parseInt($(this).val()));
            });
            if($(this).siblings().find('.custom').length>0){
                skill[name].push($(this).siblings().find('.custom').val());
            }
            if($(this).siblings('.custom-base').length>0) {
                skill[name].push($(this).siblings('.custom-skill-name').text());
                skill[name].push(parseInt($(this).siblings('.custom-base').text()));
            }
        }
        if (parseInt($(this).text()) === parseInt($(this).siblings('.base').text())
            && parseInt($(this).text()) <= parseInt($(this).siblings('.base-skill').text())
            && $(this).siblings('.custom-base').length<=0)
            delete skill[name];
    });
    this.skill=skill;
    this.stat=stat;
    return this;
}
