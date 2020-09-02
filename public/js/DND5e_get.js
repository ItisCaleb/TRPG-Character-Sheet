document.write('');
$(document).ready(function () {
    let sheet = {};
    const url = $(location).attr('href');
    const array = url.split('/');
    const id = array[array.length - 1];
    var socket;
    if($('#status').data('status')==='view') {
        socket = io();
        socket.emit('join',id);
    }
    try{
        socket.on('asyncInput',(data)=>{
            if(data.key === 'input'){
                let input=$(`${data.key}[data-${data.key}=${data.index}]`);
                input.val(data.payload);
                if(input.attr('type')==='checkbox' && data.payload ==='yes'){
                    input.prop('checked',true);
                }else if  (input.attr('type')==='checkbox'){
                    input.prop('checked',false);
                }
                $('.permissions').each(function () {
                    $(this).removeClass('permissions-choose');
                    if ($(this).text() === $('.permission-status').val()) {
                        $(this).addClass('permissions-choose');
                    }
                });
                sheetSetup();
            }else {
                $(`${data.key}[data-${data.key}=${data.index}]`).val(data.payload);
            }

        });
        socket.on('delete',()=>{
            good_message('此角卡已被刪除');
            setTimeout( ()=>{
                redirect('/trpgsession');
            },1000)
        })
    }catch (err) {

    }
    if ($('#url').length > 0){
        $.ajax({
            url: '../api/sheet/DND5e/json/' + id,
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                sheet = JSON.parse(data);
                const image = sheet.story.avatar;
                const skills = sheet.spell.skills;
                const spell_info =sheet.spell.spell;
                const death_save = sheet.spell.death_save;
                (image === '')
                    ? $("#add-image").attr("src", '/public/source/iconmonstr-plus-6.svg')
                    : $("#add-image").attr("src", "data:image/;base64," + image);

                $('.skill-name').each(function () {
                    if(skills.length===0) return;
                    for(let i=0;i<skills.length;i++){
                        if($(this).text().includes(skills[i])){
                            $(this).children('input').val('yes');
                            $(this).children('input').prop('checked',true);
                        }
                    }
                });
                $('.death-save').each(function (i) {
                    if(death_save[i]==='yes'){
                        $(this).val('yes');
                        $(this).prop('checked',true);
                    }
                });
                $('.permissions').each(function () {
                    $(this).removeClass('permissions-choose');
                    if ($(this).text() === $('.permission-status').val()) {
                        $(this).addClass('permissions-choose');
                    }
                });
                $('.spell-slot').each(function (index) {
                    if(spell_info==null) return;
                    const spellInfo =spell_info[index];
                    $(this).siblings('section').find('input').each(function (i) {
                        $(this).val(spellInfo.number[i])
                    });
                    $(this).find('.spell-name').each(function (i) {
                        if(Object.keys(spellInfo).length===1) return false;
                        $(this).val(Object.keys(spellInfo.spells)[i]);
                        if(spellInfo.spells[Object.keys(spellInfo.spells)[i]]==='yes'){
                            $(this).siblings('.check-input').prop('checked',true);
                            $(this).siblings('.check-input').val('yes');
                        }
                    })
                });
                sheetSetup()
            },error: function () {
                redirect('/charactersheet')
            },
            dataType: 'json'
        })
    }
    function sheetSetup() {
        $('input[type=number]').each(function () {
            if($(this).val()<0 || $(this).val()===String ||$(this).val()===""){
                $(this).val(0);
            }
        });
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
        });
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


});