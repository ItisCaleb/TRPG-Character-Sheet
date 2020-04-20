document.write();
$(document).ready(function () {
    //sum up function
    function sum_up(bas,adj){
        return parseInt(bas,10) + parseInt(adj,10)
    }

    //repeat
    setInterval(function () {

        //calculate the sum of the stat
        var str = parseInt(($('#str').text(sum_up($('#str-bas').val(),$('#str-adj').val()))).text());
        var con = parseInt(($('#con').text(sum_up($('#con-bas').val(),$('#con-adj').val()))).text());
        var dex = parseInt(($('#dex').text(sum_up($('#dex-bas').val(),$('#dex-adj').val()))).text());
        var app = parseInt(($('#app').text(sum_up($('#app-bas').val(),$('#app-adj').val()))).text());
        var pow = parseInt(($('#pow').text(sum_up($('#pow-bas').val(),$('#pow-adj').val()))).text());
        var siz = parseInt(($('#siz').text(sum_up($('#siz-bas').val(),$('#siz-adj').val()))).text());
        var int = parseInt(($('#int').text(sum_up($('#int-bas').val(),$('#int-adj').val()))).text());
        var edu = parseInt(($('#edu').text(sum_up($('#edu-bas').val(),$('#edu-adj').val()))).text());
        $('#hp-max').text(Math.floor(sum_up(con,siz)/10));
        $('#mp-max').text(Math.floor(pow/5));
        $('#san-max').text(sum_up(99,-$('#san-minus').text()));
        var class_feature=$('.class-feature').val()
        $('.class-point').text(function () {
            var sum
            if(class_feature==='EDU')
                sum=4*(edu);
            if(class_feature==='EDU+STR')
                sum=2*(edu+str);
            if(class_feature==='EDU+DEX')
                sum=2*(edu+dex);
            if(class_feature==='EDU+APP')
                sum=2*(edu+app);
            if(class_feature==='EDU+POW')
                sum=2*(edu+pow);
            $('.class').each(function () {
                sum-=$(this).val()
            })
            return '剩餘職業點數：'+sum
        })
        $('.interest-point').text(function () {
            var sum = int*2
            $('.interest').each(function () {
                sum-=$(this).val()
            })
            return '剩餘興趣點數：'+sum
        })
        //calculate the origin value of these specific skills
        $('#dodge').text(Math.floor(dex/2));
        $('#mother-language').text(edu);

        //calculate mov value
        if(dex < siz || str < siz)
            $('#mov').text('7');
        if(dex >= siz || str >= siz)
            $('#mov').text('8');
        if(dex > siz && str > siz)
            $('#mov').text('9');

        //calculate db and build value
        if(str + siz < 2)
            $('#build').text('請填寫完整屬性');
        if(str + siz >= 2 && str + siz <= 64)
            $('#build').text('-2 & -2');
        if(str + siz >= 65 && str + siz <= 84)
            $('#build').text('-1 & -1');
        if(str + siz >= 85 && str + siz <= 124)
            $('#build').text('0 & 0');
        if(str + siz >= 125 && str + siz <= 164)
            $('#build').text('+1d4 & 1');
        if(str + siz >= 165 && str + siz <= 204)
            $('#build').text('+1d6 & 2');
        if(str + siz >= 205 && str + siz <= 284)
            $('#build').text('+2d6 & 3');
        if(str + siz >=285)
            $('#build').text(Math.floor((((str+siz)-205)/80)+2)+'d6 & '+Math.floor((((str+siz)-205)/80)+3));

    },0);

    //declare skill as an object and stat as an array
    var skill = {};
    var stat = [];
    setInterval(function () {

        $('.class-feature').change(function () {
            $('.class-feature').val($(this).val())
        })

        //maker sure stat's and skill's value won't pass the limit
        $('.attr-add').each(function () {
            if ($(this).val()>99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
            if ($(this).val()<-50)
                $(this).val(-50);
        });
        $('.attr').each(function () {
            if ($(this).val()>99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
            if ($(this).val()<0)
                $(this).val(0);
        });
        $('.skill').each(function () {
            if ($(this).val()>99)
                $(this).val(99);
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
            if ($(this).val()<0)
                $(this).val(0);
        });
        if(parseInt($('#hp').val())>parseInt($('#hp-max').text()) || parseInt($('#hp').val())<0)
            $('#hp').val($('#hp-max').text());
        if(parseInt($('#mp').val())>parseInt($('#mp-max').text()) || parseInt($('#mp').val())<0)
            $('#mp').val($('#mp-max').text());
        if(parseInt($('#san').val())>parseInt($('#san-max').text()) )
            $('#san').val($('#san-max').text());
        if(parseInt($('#luk').val())>99 || parseInt($('#luk').val())<0)
            $('#luk').val(99);

        //push the stat's value to array
        stat = [];
        $('.chara').each(function () {
            //make sure the total value of stat won't below 0
            if (parseInt($(this).text())<0) {
                $(this).siblings('.attr-add').val(function () {
                    return parseInt($(this).val()) + 1
                });
            }
            //push the stat's value to array
            $(this).siblings('.stat').each(function () {
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
                sum += parseInt($(this).siblings('.base').text()) ;
                return sum
            });
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
    },0);
    $('.dice').click(function () {
        $(this).siblings('.attr').val(getRandom(3,18)*5)
    })
    function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    //add stat's and skill's value to the form
    $('#myform').submit(function (e) {
        e.preventDefault();

        var sheet = $(this).serializeArray();


        sheet.push({name:'skill',value:skill});
        sheet.push({name:'stat',value:stat});
        $.ajax({
            url: "../../api/sheet/COC7th",
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data:JSON.stringify(sheet) ,
            success:function(data){
                good_message(data)
                setTimeout(function(){
                    redirect('/charactersheet')
                },1000)
            },

        });
    })
});
