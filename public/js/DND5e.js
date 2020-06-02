document.write();
$(document).ready(function () {
    sheetSetup()
    optionSetup()
    $(document).on('input','input',function () {
        sheetSetup()
    })
    $('.check-input').on('click',function (e) {
        if($(this).val()==='on') {
            $(this).val('yes');
        }else if($(this).val()==='yes'){
            $(this).val('on')
        }
    })

    $(document).on("click", ".create", function (e){
      e.preventDefault();
      const calSheet =sheetPush()
      const skill =calSheet.skill;
      const sheet = $('#myform').serializeArray();
      sheet.push(skill);
      console.log(sheet);
    })
    function sheetSetup() {
        $('input[type=number]').each(function () {
            if($(this).val()<0 || $(this).val()===String ||$(this).val()===""){
                $(this).val(0);
            }
        })
        const str = Math.floor(($('#str').val()-10)/2);
        const dex = Math.floor(($('#dex').val()-10)/2);
        const con = Math.floor(($('#con').val()-10)/2);
        const int = Math.floor(($('#int').val()-10)/2);
        const wis = Math.floor(($('#wis').val()-10)/2);
        const cha = Math.floor(($('#cha').val()-10)/2);
        const mod=[str,dex,con,int,wis,cha];
        $('.mod').each(function (i) {
            if(mod[i]>0) {
                $(this).text('+'+mod[i]);
            }else $(this).text(mod[i]);
        })
        $('.skill-td').each(function () {
            if($(this).siblings('.attr').text().includes('力量')){
                $(this).children('.skill').text(str);
            }
            if($(this).siblings('.attr').text().includes('敏捷')){
                $(this).children('.skill').text(dex);
            }
            if($(this).siblings('.attr').text().includes('智力')){
                $(this).children('.skill').text(int);
            }
            if($(this).siblings('.attr').text().includes('感知')){
                $(this).children('.skill').text(wis);
            }
            if($(this).siblings('.attr').text().includes('魅力')){
                $(this).children('.skill').text(cha);
            }
            if($(this).find('input[type=checkbox]').val()==='yes'){
                $(this).children('.skill').text(parseInt($('#pro').val())+ parseInt($(this).children('.skill').text()))
            }
        })

    }
    function sheetPush() {
        var skill=[];
        $('.skill').each(function () {
            const input = $(this).siblings('label');
            if($(this).siblings('label').find('input').val()==='yes'){
                skill.push(input.text())
            }
        })
        this.skill=skill;
        return this;
    }
    function optionSetup (){
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
        $('.permissions').on('click',function () {
            $('.permissions').removeClass('permissions-choose');
            $(this).addClass('permissions-choose');
            $('.permission-status').val($(this).text()).trigger('change')
        })
    }
})