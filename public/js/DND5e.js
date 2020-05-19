document.write();
$(document).ready(function () {
    $('ul.main-tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.main-tabs li').removeClass('main-current');
        $('.main-tab-content').removeClass('main-current');

        $(this).addClass('main-current');
        $("#" + tab_id).addClass('main-current');
    })
    $('#mobile-option').click(function () {
        $('.mobile-nav-menu') .show();
    })
    $('.list-button').click(function () {
        $('.left-list-menu').show();
    })
    $('.mobile-permission').click(function () {
        $('.mobile-permission-menu').show();
    })
    $('.permission').click(function () {
        $('.right-list-menu').show();
    })
    setInterval(function () {
        $('.skill').each(function () {
            var num=$(this).text();
            var attr=$(this).siblings('p').text();
            console.log(attr);
        })
    },0)

    $(document).on("click", ".create", function (e){
      e.preventDefault();
        var skill=[];
        $('.skill').each(function () {
            const input = $(this).siblings('label');
            if(parseInt($(this).text())>0){
                skill.push(input.text())
            }
        })
      const sheet = $('#myform').serializeArray();
      sheet.push(skill);
      console.log(sheet);
    })

})