document.write();
$(document).ready(function () {
    function sum_up(bas,adj){
        return parseInt(bas,10) + parseInt(adj,10)
    }
    setInterval(function () {
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
        $('#dodge').text(Math.floor(dex/2));
        $('#mother-language').text(edu);
        if(dex < siz || str < siz)
            $('#mov').text('7');
        if(dex >= siz || str >= siz)
            $('#mov').text('8');
        if(dex > siz && str > siz)
            $('#mov').text('9');
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
    setInterval(function () {
        $('.attr-add').each(function () {
            if ($(this).val()>100)
                $(this).val(100);
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
            if ($(this).val()<-50)
                $(this).val(-50);
        });
        $('.attr').each(function () {
            if ($(this).val()>100)
                $(this).val(100);
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
            if ($(this).val()<0)
                $(this).val(0);
        });
        $('.skill').each(function () {
            if ($(this).val() === '' || $(this).val() === String )
                $(this).val(0);
        });
        if(parseInt($('#hp').val())>parseInt($('#hp-max').text()))
            $('#hp').val($('#hp-max').text());
        if(parseInt($('#mp').val())>parseInt($('#mp-max').text()))
            $('#mp').val($('#mp-max').text());
        if(parseInt($('#san').val())>parseInt($('#san-max').text()))
            $('#san').val($('#san-max').text());
        if(parseInt($('#luk').val())>parseInt($('#luk-max').text()))
            $('#luk').val($('#luk-max').val());

        $('.total').each(function () {
            $(this).text(function () {
                var sum = 0;
                $(this).siblings().find('.base-input').each(function () {
                    sum += parseInt($(this).val());
                });
                sum += parseInt($(this).siblings('.base').text()) ;
                return sum
            });
        });
    },0)
});
