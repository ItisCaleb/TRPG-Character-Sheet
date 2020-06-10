document.write('');
$(document).ready(function () {
    let sheet = {};
    const url = $(location).attr('href');
    const array = url.split('/');
    const id = array[array.length - 1];
    if ($('#url').length > 0){
        $.ajax({
            url: '../api/sheet/DND5e/json/' + id,
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                sheet = JSON.parse(data);
                for (let i = 0; i < Object.keys(sheet).length; i++) {
                    delete sheet[Object.keys(sheet)[i]]._id;
                    delete sheet[Object.keys(sheet)[i]].__v;
                }
                delete sheet.info.system;
                delete sheet.info.author;
                delete sheet.info.session;
                console.log(sheet);
                $('.info').each(function (index) {
                    $(this).val(sheet.info[Object.keys(sheet.info)[index]]);
                });
                $('.story').each(function (index) {
                    $(this).val(sheet.story[Object.keys(sheet.story)[index]]);
                });
            },error: function () {
                redirect('/charactersheet')
            },
            dataType: 'json'
        })
    }



});