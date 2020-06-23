document.write();
$(document).ready(function () {
    sheetSetup()
    optionSetup()
    $(document).on('input','input',function () {
        sheetSetup()
    })
    $('.check-input').on('click',function (e) {
        if($(this).val()==='on') {
            $(this).prop('checked',true);
            $(this).val('yes');
        }else if($(this).val()==='yes'){
            $(this).prop('checked',false);
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
      const death_save = calSheet.death_save;
      var sheet = new FormData($('#myform')[0]);
      sheet.append('skill',JSON.stringify(skill));
      sheet.append('spell',JSON.stringify(spell));
      sheet.append('money',JSON.stringify(money));
      sheet.append('stat',JSON.stringify(stat));
      sheet.append('attack',JSON.stringify(attack));
      sheet.append('death_save',JSON.stringify(death_save));
      sheet.append('file',$('input[type=file]')[0].files[0]);
      console.log(skill);
      $.ajax({
          url:'../../api/sheet/DND5e',
          type:'POST',
          contentType: false,
          processData: false, // required
          data:  sheet,
          success: function (data) {
              console.log('yes')
              good_message(data)
              setTimeout(function () {
                  redirect('/charactersheet');
              }, 1000)
          }, error: function (data) {
              console.log('no')
              bad_message(data.responseText)
              setTimeout(function () {
                  $('.create').prop('disabled',false);
              },1000)
          }
      })
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
            if($(this).siblings('.attr').text().includes('體魄')){
                $(this).children('.skill').text(con);
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
            $(this).siblings('label').find('.spell-number').each(function () {
                spell[index]["number"].push($(this).val());
            });
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
        var death_save=[];
        $('.death-save').each(function () {
            death_save.push($(this).val());
        })
        this.spell=spell;
        this.skill=skill;
        this.money=money;
        this.stat=stat;
        this.attack=attack;
        this.death_save=death_save;
        return this;
    }
    $(document).on('change','#image',function (inp) {
        var input=inp.currentTarget
        if (input.files && input.files[0]) {
            $('#error-image').remove();
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            const size=(input.files[0].size/1024)
            console.log(size +"kb");
            if(size>=500){
                $('#add-image').parent('label').append('<p id="error-image" style="color: red;font-size: 10px">檔案過大!請上傳小於500kb的圖像</p>')
                $('#image').val('');
            }else{
                reader.onload = function (e) {
                    $('#add-image').attr('src', e.target.result)
                };
            }
        }
    })
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