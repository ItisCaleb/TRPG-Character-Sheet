const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
    check:{
        type:Boolean,
        default:false
    },
    text:{
        type:String,
        default:""
    }

})

const DND5eSpellSchema = new mongoose.Schema({
    spell_class: {
        type: String,
        max: 30,
        default: ""
    },
    spell_ability: {
        type: String,
        max: 20,
        default: ""
    },
    spell_save: {
        type: String,
        max: 20,
        default: 0
    },
    spell_bonus: {
        type: String,
        max: 20,
        default: 0
    },
    spell: {
        "0": {
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "1":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "2":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "3":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "4":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "5":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "6":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "7":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "8":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
        "9":{
            total:{
                type:Number,
                max:30,
                default:0
            },
            usage:{
                type:Number,
                max:30,
                default:0
            },
            list:{
                type:[SpellSchema],
                default:() => ([{}])
            }
        },
    }
});



module.exports = mongoose.model("DND5e_Spell", DND5eSpellSchema);
