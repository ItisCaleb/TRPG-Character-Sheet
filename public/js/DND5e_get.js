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
                const death_save = sheet.stat.death_save;
                const skills = sheet.stat.skills;
                const stat=sheet.stat.stat;
                const spell_info =sheet.spell.spell;
                const image = sheet.story.avatar;
                delete sheet.stat.death_save;
                delete sheet.stat.skills;
                delete sheet.stat.stat;
                delete sheet.spell.spell;
                delete sheet.story.avatar;
                (image === '') ? $("#add-image").attr("src", '/public/source/iconmonstr-plus-6.svg') : $("#add-image").attr("src", "data:image/;base64," + image);
                $('.info').each(function (index) {
                    $(this).val(sheet.info[Object.keys(sheet.info)[index]]);
                });
                $('.story').each(function (index) {
                    $(this).val(sheet.story[Object.keys(sheet.story)[index]]);
                });
                $('.stat').each(function (index) {
                    $(this).val(sheet.stat[Object.keys(sheet.stat)[index]])
                })
                $('.skill-name').each(function () {
                    if(skills.length===0) return
                    for(let i=0;i<skills.length;i++){
                        if($(this).text().includes(skills[i])){
                            $(this).children('input').val('yes');
                            $(this).children('input').prop('checked',true);
                        }
                    }
                })
                $('.base-attr').each(function (index) {
                    $(this).val(stat[index])
                })
                $('#equipment').val(sheet.equip.equipment);
                $('.attack').each(function (i) {
                    $(this).val(sheet.equip.attack[i]);
                })
                $('.money').each(function (i) {
                    $(this).val(sheet.equip.money[i]);
                })
                $('.spell-attr').each(function (index) {
                    $(this).val(sheet.spell[Object.keys(sheet.spell)[index]])
                })
                $('.spell-slot').each(function (index) {
                    const spellInfo =spell_info[index];
                    $(this).siblings('section').find('input').each(function (i) {
                        $(this).val(spellInfo.number[i])
                    })
                    $(this).find('.spell-name').each(function (i) {
                        if(Object.keys(spellInfo).length===1) return false
                        $(this).val(Object.keys(spellInfo.spells)[i]);
                        if(spellInfo.spells[Object.keys(spellInfo.spells)[i]]==='yes'){
                            $(this).siblings('.check-input').prop('checked',true);
                            $(this).siblings('.check-input').val('yes');
                        }
                    })
                })
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


});