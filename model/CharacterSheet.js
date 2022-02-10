const Info = require("./SheetInfo");
const Avatar = require("./Avatar");
const mongoose = require("mongoose");
const Session = require("./Session");
class CharacterSheet {
    info
    user
    schema = {}
    query = {}
    //load all schema
    constructor(schema){
        this.schema = schema
    }
    async init(id=null, user = null){
        if(id!=null){
            this.user = user
            this.info = await Info.findById(id)
            for (let [key, model] of Object.entries(this.schema)){
                this.query[key] = model.findById(id)
            }
        }
        return this
    }

    async create(name, player, system, author_id){
        this.info = await new Info({
            name: name,
            player_name: player,
            system: system,
            author: author_id
        })
        await this.info.save()
        //create models
        for (let [_, model] of Object.entries(this.schema)){
            await new model({_id: this.info._id,}).save()
        }
        await new Avatar({_id: this.info._id, type: system}).save()
        return this.info._id
    }

     update(newInfo , updated = {}){
        if (newInfo !=null && !['限團務GM', '團務所有人', '所有人'].includes(newInfo.permission)) newInfo.permission = '所有人'
        if (newInfo == null) newInfo = {}
        Info.updateOne({_id:this.info._id},{
            name:newInfo.name || this.info.name,
            player_name: newInfo.player_name || this.info.player_name,
            permission: newInfo.permission || this.info.permission,
            updated: Date.now()
        },()=>{})
        for (let [key, model] of Object.entries(updated)){
            this.query[key].updateOne({},{$set:model})
        }
        return this
    }

    delete(){
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

    async checkView(){
        let ids = this.info.session.map(id=>mongoose.Types.ObjectId(id))
        switch (this.info.permission){
            case "所有人":
                return true
            case "限團務GM":
                if(this.user == null) return false
                //if found return true else return false
                return !!(await Session.find({_id: {$in: ids}, gm: this.user.name}))
            case "團務所有人":
                if(this.user == null) return false
                return !!(await Session.find({_id: {$in: ids}, player: this.user.name}))
        }
    }
}

module.exports = CharacterSheet
