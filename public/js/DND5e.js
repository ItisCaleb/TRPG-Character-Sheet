document.write();
$(document).ready(function () {
    $('#mobile-option').on('click',function () {
        $('.mobile-nav-menu') .show();
    })
    $('.list-button').on('click',function () {
        $('.left-list-menu').show();
    })
    $('.mobile-permission').on('click',function () {
        $('.mobile-permission-menu').show();
    })
    $('.permission').on('click',function () {
        $('.right-list-menu').show();
    })
    setInterval(function () {
        $('.skill').each(function () {
            var num=$(this).text();
            var attr=$(this).siblings('p').text();
        })
    },0)
    $('input[name=check]').on('click',function (e) {
        if($(this).val()==='on') {
            $(this).val('yes');
        }else if($(this).val()==='yes'){
            $(this).val('on')
        }
        console.log($(this).val())

    })
    $(document).on("click", ".create", function (e){
      e.preventDefault();
        var skill=[];
        $('.skill').each(function () {
            const input = $(this).siblings('label');
            if($(this).siblings('label').find('input').val()==='yes'){
                skill.push(input.text())
            }
        })
      const sheet = $('#myform').serializeArray();
      sheet.push(skill);
      console.log(sheet);
    })

})