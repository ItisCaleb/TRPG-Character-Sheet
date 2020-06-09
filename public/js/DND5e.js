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
      const calSheet =sheetPush();
      const spell =calSheet.spell;
      const skill =calSheet.skill;
      const money =calSheet.money;
      const stat =calSheet.stat;
      const attack=calSheet.attack;
      //const sheet = $('#myform').serializeArray();
      var sheet = new FormData($('#myform')[0]);
      sheet.append('skill',JSON.stringify(skill));
      sheet.append('spell',JSON.stringify(spell));
      sheet.append('money',JSON.stringify(money));
      sheet.append('stat',JSON.stringify(stat));
      sheet.append('attack',JSON.stringify(attack));
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
        var spell={0:{},1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{}};
        $('.skill').each(function () {
            const input = $(this).siblings('label');
            if($(this).siblings('label').find('input').val()==='yes'){
                skill.push(input.text())
            }
        })
        var stat =[];
        $('.base-attr').each(function () {
            stat.push($(this).val());
        })
        $('.spell-level').each(function (index) {
            spell[index]["number"]=[];
            spell[index]["spells"]={};
            spell[index]["number"].push($(this).siblings('label').children('.spell-number').val());
            spell[index]["number"].push($(this).siblings('label').children('.spell-number').val());
            $(this).parent().siblings().children('label').each(function (i) {
                if ($(this).children('.spell-name').val()!==("")){
                    const name=$(this).children('.spell-name').val();
                    spell[index]["spells"][name]=($(this).children('.check-input').val());
                }
            })
        })
        var attack=[];
        $('.attack').each(function () {
            attack.push($(this).val());
        })
        var money=[];
        $('.money').each(function () {
            money.push($(this).val());
        })
        this.spell=spell;
        this.skill=skill;
        this.money=money;
        this.stat=stat;
        this.attack=attack;
        return this;
    }
    $('#cancel-image').on('click',function (e) {
        e.preventDefault();
        if($('#image').val()!=='' || $('#add-image').attr('src') !=='/public/source/iconmonstr-plus-6.svg') {
            $('#image').val('');
            $('#add-image').attr('src', '/public/source/iconmonstr-plus-6.svg')
            $('#name').trigger('change')
        }
    })
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