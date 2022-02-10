
export default {
    COC7th:{
        pages:[{
            name:"info",
            component:"COC7thInfo",
        },{
            name: "background",
            component: "COC7thBackground",
        },{
            name: "skill",
            component: "COC7thSkill",
        }],
        props:{
            info: {
                author: "",
                name: "",
                permission: "所有人",
                system: "COC7th"
            },
            stat: {
                hp: 0,
                san: 0,
                mp: 0,
                luk: 0,
                insane_status: "無",
                injured_status: "無",
                characteristic: {
                    str: 0,
                    con: 0,
                    dex: 0,
                    app: 0,
                    pow: 0,
                    siz: 0,
                    int: 0,
                    edu: 0
                }
            },
            equip: {
                equip: "",
                cash: "",
                weapon: ""
            },
            skills: {
                class_feature: "EDU",
                skill: {}
            },
            story: {
                class: "",
                age: "",
                sex: "",
                residence: "",
                birthplace: "",
                description: "",
                belief: "",
                significant_people: "",
                meaningful_location: "",
                treasured_possession: "",
                trait: "",
                myth: "",
                injuries: "",
                mania: "",
                magic: "",
                encounter: "",
                fellow_investigator: "",
                note: ""
            }
        }
    },
    COC6th:{
        pages:[{
            name:"info",
            component:"COC6thInfo",
        },{
            name: "background",
            component: "COC6thBackground",
        },{
            name: "skill",
            component: "COC6thSkill",
        }],
        props:{
            info: {
                author: "",
                name: "",
                permission: "所有人",
                system: "COC6th"
            },
            stat: {
                hp: 0,
                san: 0,
                mp: 0,
                luk: 0,
                characteristic: {
                    str: 0,
                    con: 0,
                    dex: 0,
                    app: 0,
                    pow: 0,
                    siz: 0,
                    int: 0,
                    edu: 0
                }
            },
            equip: {
                equip: "",
                cash: "",
                weapon: {
                    melee:[],
                    firearm:[]
                }
            },
            skills: {
                skill: {}
            },
            story: {
                class: "",
                age: "",
                sex: "",
                degree:"",
                mental:"",
                insanity:"",
                residence: "",
                birthplace: "",
                description: "",
                family: "",
                trait: "",
                injuries: "",
                scars:"",
                tomes:"",
                magic: "",
                encounter: "",
                fellow_investigator: "",
                note: ""
            }
        }
    },
    DND5e:{
        pages:[{
            name:"info",
            component:"DND5eInfo",
        },{
            name:"skill_equip",
            component: "DND5eEquip"
        },{
            name: "background",
            component: "DND5eStory",
        },{
            name: "spell",
            component: "DND5eSpell",
        }],
        props:{
            info: {
                author: "",
                name: "",
                permission: "所有人",
                system:"DND5e"
            },
            stat: {
                stat: {
                    str: 10,
                    dex: 10,
                    con: 10,
                    wis: 10,
                    int: 10,
                    cha: 10
                },
                inspiration: 0,
                passive_wisdom: 0,
                pro: 0,
                armorValue: 0,
                initiative: 0,
                speed: "",
                max_hp: 0,
                hp: 0,
                temp_hp: 0,
                hit_dice_total: 0,
                hit_dice: 0,
                death_save: "00",
                savings: [],
                skills: []

            },
            story: {
                height: "",
                skin: "",
                age: "",
                weight: "",
                hair: "",
                pupil: "",
                trait: "",
                alignment: "",
                backstory: "",
                otherTrait: "",
                personality: "",
                ideals: "",
                bonds: "",
                flaws: "",
                note: ""
            },
            equip: {
                attack: {
                    first: "",
                    second: "",
                    third: "",
                    spells: ""
                },
                money: {
                    cp: 0,
                    sp: 0,
                    ep: 0,
                    gp: 0,
                    pp: 0
                },
                equipment: "",
                treasure: "",
                language: ""

            },
            spell: {
                spell_class: "",
                spell_ability: "",
                spell_save: 0,
                spell_bonus: 0,
                spell: {
                    "0": [],
                    "1": [],
                    "2": [],
                    "3": [],
                    "4": [],
                    "5": [],
                    "6": [],
                    "7": [],
                    "8": [],
                    "9": [],
                }
            },
            success: {
                info: false,
                stat: false,
                spell: false,
                equip: false,
                story: false,
                all: false,
                not_init: false,
                upload: true
            },
        }
    }
}
