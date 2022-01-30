const Info = require('../model/SheetInfo')



module.exports = function (req) {
    return new Promise(async (resolve, reject) => {
        let info;
        let id = req.params.id
        try {
            info = await Info.findById({_id:id}).lean()
        }catch(err) {
            reject(err)
        }
        if(!info) return reject("notFound")
        if(req.params.system !== info.system) return reject('Wrong System')
        const system=info.system
        let sheet = {}
        switch (system) {
            case 'COC7th':
                sheet = {
                    info: info,
                    stat: await COC7thStat.findById({_id: id}).lean(),
                    story: await COC7thStory.findById({_id: id}).lean(),
                    equip: await COC7thEquip.findById({_id: id}).lean(),
                    skill: await COC7thSkill.findById({_id: id}).lean()
                }
                resolve(sheet)
                break;
            case 'COC6th':
                sheet = {
                    info: info,
                    stat: await COC6thStat.findById({_id: id}).lean(),
                    story: await COC6thStory.findById({_id: id}).lean(),
                    equip: await COC6thEquip.findById({_id: id}).lean(),
                    skill: await COC6thSkill.findById({_id: id}).lean()
                }
                resolve(sheet)
                break;
            case 'DND5e':
                sheet = await new DND5e(id).exec()
                resolve(sheet)
                break;
        }
    })
};
