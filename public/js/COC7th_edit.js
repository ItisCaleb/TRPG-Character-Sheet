document.write();
$(document).ready(function () {
    var url = $(location).attr('href')
    var array = url.split('/');
    var id = array[array.length-1];
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
        $.get('../api/sheet/delete/'+ id,
            function(data){
                message(data)
                setTimeout(function(){
                    redirect('/charactersheet')
                },1000)
        })
    })
});