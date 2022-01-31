const Info = require("./SheetInfo");
const Avatar = require("./Avatar");
class CharacterSheet {
    info
    schema = {}
    query = {}
    constructor(id=null, system, schema, author = null){
        this.schema = schema
        if(id!=null){
            if(author) this.info = Info.findOne({_id:id, system: system, author:author})
            else this.info = Info.findOne({_id:id, system: system})
            for (let [key, model] of Object.entries(this.schema)){
                this.query[key] = model.findById(id)
            }
        }
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
        await new Avatar({_id: this.info._id, type: "DND5e"}).save()
        return this.info._id
    }

    update(name, pname, perm , updated = {}){
        this.info.updateOne({},{
            name:name,
            player_name: pname,
            permission: perm,
            updated: Date.now()
        })
        for (let [key, model] of Object.entries(updated)){
            this.query[key].updateOne({},{$set:model})
        }
        return this
    }

    delete(){
        this.info.deleteOne({})
        for (let [key, _] of Object.entries(this.query)){
            this.query[key].deleteOne({})
        }
        return this
    }

    async exec(){
        try{
            const sheet = {}
            sheet.info = await this.info.exec()
            for (let [key, model] of Object.entries(this.query)){
                sheet[key] = await model.exec()
            }
            return sheet
        }catch (err){
            throw err
        }
    }
}

module.exports = CharacterSheet
