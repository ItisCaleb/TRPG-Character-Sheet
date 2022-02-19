const Info = require("./SheetInfo");
const Avatar = require("./Avatar");
const mongoose = require("mongoose");
const Session = require("./Session");

const DND5eStat = require("./DND5e/Stat");
const DND5eStory = require("./DND5e/Story");
const DND5eEquip = require("./DND5e/Equip");
const DND5eSpell = require("./DND5e/Spell");
const COC7thStat = require("./COC7th/Stat");
const COC7thStory = require("./COC7th/Story");
const COC7thEquip = require("./COC7th/Equip");
const COC7thSkill = require("./COC7th/Skill");
const COC6thStat = require("./COC6th/Stat");
const COC6thStory = require("./COC6th/Story");
const COC6thEquip = require("./COC6th/Equip");
const COC6thSkill = require("./COC6th/Skill");

const systems = {
    COC7th:{
        schema: {
            stat: COC7thStat,
            story: COC7thStory,
            equip: COC7thEquip,
            skills: COC7thSkill
        },
        props: ["stat","story","equip","skills"]
    },
    COC6th:{
        schema:{
            stat: COC6thStat,
            story: COC6thStory,
            equip: COC6thEquip,
            skills: COC6thSkill
        },
        props: ["stat","story","equip","skills"]
    },
    DND5e:{
        schema:{
            stat: DND5eStat,
            story: DND5eStory,
            equip: DND5eEquip,
            spell: DND5eSpell
        },
        props: ["stat","story","equip","spell"]
    }
}

function getSystem(system){
    if(!systems.hasOwnProperty(system)){
        throw new Error("No selected system")
    }
    return systems[system]
}

class CharacterSheet {
    info
    user
    system
    query = {}
    //load all schema
    async init(id=null, user = null){
        if(id!=null){
            this.user = user
            this.info = await Info.findById(id)
            this.system = this.info.system
            for (let [key, model] of Object.entries(systems[this.system].schema)){
                this.query[key] = model.findById(id).select("-_id -__v")
            }
        }
        return this
    }

    async create(name, player, system, author_id){
        if(!systems.hasOwnProperty(system)){
            throw new Error("No Selected System")
        }
        this.info = await new Info({
            name: name,
            player_name: player,
            system: system,
            author: author_id
        })
        await this.info.save()
        //create models
        for (let model of Object.values(systems[system].schema)){
            await new model({_id: this.info._id,}).save()
        }
        await new Avatar({_id: this.info._id, type: system}).save()
        return this.info._id
    }

     update(newInfo , updated = {}){
        if (newInfo !=null && !['限團務GM', '團務所有人', '所有人'].includes(newInfo.permission)) newInfo.permission = '所有人'
        if (newInfo == null) newInfo = {}
         if(!this.checkOwn()) throw new Error("no Permission")
         //check fields is right
         const newSheet = {}
         let props = systems[this.system].props
         for (let i=0;i<props.length;i++){
             if(updated[props[i]]!=null){
                 newSheet[props[i]] = updated[props[i]]
             }
         }
         Info.updateOne({_id:this.info._id},{
            name:newInfo.name || this.info.name,
            player_name: newInfo.player_name || this.info.player_name,
            permission: newInfo.permission || this.info.permission,
            updated: Date.now()
        },()=>{})
        for (let [key, model] of Object.entries(newSheet)){
            this.query[key].updateOne({},{$set:model})
        }
        return this
    }

    delete(){
        if(!this.checkOwn()) throw new Error("no Permission")
        Info.deleteOne({_id:this.info._id},()=>{})
        for (let [key, _] of Object.entries(this.query)){
            this.query[key].deleteOne({})
        }
        return this
    }

    async exec(...field){
        try{
            const sheet = {}
            if(!this.checkOwn() && !await this.checkView()){
                throw new Error("no Permission")
            }
            sheet.info = this.info
            for (let [key, model] of Object.entries(this.query)){
                if(field.length === 0 || field.includes(key)){
                    sheet[key] = await model.exec()
                }
            }
            return sheet
        }catch (err){
            throw err
        }
    }

    checkOwn(){
        if(this.user==null) return false
        return this.info.author.equals(this.user._id)
    }

    async checkView(session=null){
        let ids = this.info.session.map(id=>mongoose.Types.ObjectId(id))
        switch (this.info.permission){
            case "所有人":
                return true
            case "限團務GM":
                if(this.user == null) return false
                if(session) return session.gm === this.user.name
                //if found return true else return false
                return !!(await Session.find({_id: {$in: ids}, gm: this.user.name}))
            case "團務所有人":
                if(this.user == null) return false
                if(session) return session.player.includes(this.user.name)
                return !!(await Session.find({_id: {$in: ids}, player: this.user.name}))
        }
    }
}

module.exports = {
    CharacterSheet,getSystem
}
