document.write();
$(document).ready(function () {
    //sum up function
    function sum_up(bas, adj) {
        return parseInt(bas, 10) + parseInt(adj, 10)
    }

    //repeat
    setInterval(function () {

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

    }, 0);

    //declare skill as an object and stat as an array
    var skill = {};
    var stat = [];
    setInterval(function () {

        //maker sure stat's and skill's value won't pass the limit
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


        $('.add-number').text(parseInt($('.add-slider').val()))


        //push the stat's value to array
        stat = [];
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

            //calculate the sum of skill's value
            $(this).text(function () {
                var sum = 0;
                $(this).siblings().find('.base-input').each(function () {
                    sum += parseInt($(this).val());
                });
                sum += parseInt($(this).siblings('.base').text());
                return sum
            });
            //push the active skill's value to object
            var name = $(this).siblings('.name').text();
            if (parseInt($(this).text()) > parseInt($(this).siblings('.base').text()) || parseInt($(this).text()) > parseInt($(this).siblings('.base-skill').text())) {
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
    }, 0);


    $(document).on('change', '.class-feature', function () {
        $('.class-feature').val($(this).val())
    })


    $(document).on('input', '.add-slider', function (event) {
        $(this).parent('.add-menu').siblings('.skill').val($(this).val())
    })

    //easy adding slider
    $('.skill').click(function () {
        $('.slider-pop').remove();
        $(this).parent('.td-input').append('<div class="add-menu slider-pop">\n' +
            '                                            <p class="limit-number">99</p>\n' +
            '                                            <input type="range" min="0" max="99" class="add-slider">\n' +
            '                                            <p class="add-number"></p>\n' +
            '                                            <p class="limit-number">0</p>\n' +
            '                                        </div>')
        $('.add-slider').val($(this).val());
    })

    //slider pop
    $(document).mouseup(function (e) {
        var container = $(".slider-pop");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.remove();
        }
    });
    //roll
    $('.dice').click(function () {
        $(this).siblings('label').find('.attr').val(getRandom(3, 18) * 5)
    })
    //roll
    $('.2d6dice').click(function () {
        $(this).siblings('label').find('.attr').val((getRandom(3, 12) + 6) * 5)
    })

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $('.list-button').click(function () {
        $('.left-list-menu').show();
    })
    $('#permission').click(function () {
        $('.right-list-menu').show();
    })
    $('.permissions').click(function () {
        $('.permissions').removeClass('permissions-choose');
        $(this).addClass('permissions-choose');
        $('.permission-status').val($(this).text()).trigger('change')
    })
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
    $('ul.main-tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.main-tabs li').removeClass('main-current');
        $('.main-tab-content').removeClass('main-current');

        $(this).addClass('main-current');
        $("#" + tab_id).addClass('main-current');
    })

    $(document).on('change','#image',function (inp) {
        var input=inp.currentTarget
        if (input.files && input.files[0]) {
            $('#error-image').remove();
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            const size=(input.files[0].size/1024)
            console.log(size +"kb");
            if(size>=500){
                $('#add-image').parent('label').append('<p id="error-image" style="color: red;font-size: 10px">檔案過大!請上傳小於500kb的圖像</p>')
            }else{
                reader.onload = function (e) {
                    $('#add-image').attr('src', e.target.result)
                };
            }
        }
    })

    //add stat's and skill's value to the form
    $(document).on("submit", "#myform", function (e) {
        e.preventDefault();
        var form=$(this)[0];
        var sheet = new FormData(form);
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
            }, error:function (res) {
                bad_message(res.responseText);
            }
        });
    });
});
var debug = true;//true: add debug logs when cloning
var evenMoreListeners = true;//demonstrat re-attaching javascript Event Listeners (Inline Event Listeners don't need to be re-attached)
if (evenMoreListeners) {
    var allFleChoosers = $("input[type='file']");
    addEventListenersTo(allFleChoosers);
    function addEventListenersTo(fileChooser) {
        fileChooser.change(function (event) { console.log("file( #" + event.target.id + " ) : " + event.target.value.split("\\").pop()) });
        fileChooser.click(function (event) { console.log("open( #" + event.target.id + " )") });
    }
}
var clone = {};
// FileClicked()
function fileClicked(event) {
    var fileElement = event.target;
    if (fileElement.value !== "") {
        if (debug) { console.log("Clone( #" + fileElement.id + " ) : " + fileElement.value.split("\\").pop()) }
        clone[fileElement.id] = $(fileElement).clone(); //'Saving Clone'
    }
    //What ever else you want to do when File Chooser Clicked
}

// FileChanged()
function fileChanged(event) {
    var fileElement = event.target;
    if (fileElement.value === "") {
        if (debug) { console.log("Restore( #" + fileElement.id + " ) : " + clone[fileElement.id].val().split("\\").pop()) }
        clone[fileElement.id].insertBefore(fileElement); //'Restoring Clone'
        $(fileElement).remove(); //'Removing Original'
        if (evenMoreListeners) { addEventListenersTo(clone[fileElement.id]) }//If Needed Re-attach additional Event Listeners
    }
    //What ever else you want to do when File Chooser Changed
}