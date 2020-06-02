document.write();
$(document).ready(function () {
    setInterval(function () {
        $('.skill').each(function () {
            var num=$(this).text();
            var attr=$(this).siblings('p').text();
        })
    },0)
    $('.check-input').on('click',function (e) {
        if($(this).val()==='on') {
            $(this).val('yes');
        }else if($(this).val()==='yes'){
            $(this).val('on')
        }
        console.log($(this).val())

    })
    $('input[type=number]').each(function () {
        if($(this).val()<0){
            $(this).val(0);
        }
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