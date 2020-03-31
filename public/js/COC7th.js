document.write();
$(document).ready(function () {
    function sum_up(bas,adj){
        return parseInt(bas,10) + parseInt(adj,10)
    }
    setInterval(function () {
        $('#str').text(sum_up($('#str-bas').val(),$('#str-adj').val()));
        $('#con').text(sum_up($('#con-bas').val(),$('#con-adj').val()));
        $('#dex').text(sum_up($('#dex-bas').val(),$('#dex-adj').val()));
        $('#app').text(sum_up($('#app-bas').val(),$('#app-adj').val()));
        $('#pow').text(sum_up($('#pow-bas').val(),$('#pow-adj').val()));
        $('#siz').text(sum_up($('#siz-bas').val(),$('#siz-adj').val()));
        $('#int').text(sum_up($('#int-bas').val(),$('#int-adj').val()));
        $('#edu').text(sum_up($('#edu-bas').val(),$('#edu-adj').val()));
        $('#hp').text(Math.floor(sum_up($('#con').text(),$('#siz').text())/10) );
        $('#mp').text(sum_up($('#pow').text(),0)/5);
    },1);
    setInterval(function () {
        $('.attr').each(function () {
            if ($(this).val()>100){
                $(this).val(100);
            }
            if ($(this).val()==='' || $(this).val()=== String){
                $(this).val(0);
            }
            if ($(this).val()<-50)
                $(this).val(-50);
        }) ;
    },1)
});