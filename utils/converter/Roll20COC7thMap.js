const map = {
    character_name: "info.name",
    player: "info.player_name",
    occupation: "story.class",
    sex: "story.sex",
    age: "story.age",
    birthplace: "story.birthplace",
    residence: "story.residence",
    hp: "stat.hp",
    mp: "stat.mp",
    san: "stat.san",
    luck: "stat.luk",
    str: "stat.characteristic.str",
    pow: "stat.characteristic.pow",
    con: "stat.characteristic.con",
    dex: "stat.characteristic.dex",
    app: "stat.characteristic.app",
    siz: "stat.characteristic.siz",
    int: "stat.characteristic.int",
    edu: "stat.characteristic.edu",
    gear_and_posessions: "equip.equip",
    cash: "equip.cash",
    personal_description: "story.role_description",
    ideaology_beliefs: "story.belief",
    significant_people: "story.significant_people",
    meaningful_locations: "story.meaningful_location",
    treasured_posessions: "story.treasured_possession",
    traits: "story.trait",
    injuries_scars: "story.injuries",
    phobias_manias: "story.mania",
    tomes_spells_artifacts: "story.magic",
    encounters_with_strange_entities: "story.encounter",
    fellow_investigators: "story.fellow_investigator",
    other_back_story: "story.description",
    psychology: "skills.skill.Psychology",
    credit_rating: "skills.skill.Credit Rating",
    persuade: "skills.skill.Persuade",
    fast_talk: "skills.skill.Fast-talk",
    intimidate: "skills.skill.Intimidate",
    charm: "skills.skill.Charm",
    navigate: "skills.skill.Navigate",
    survival_name: "skills.skill.Survival",
    jump: "skills.skill.Jump",
    climb: "skills.skill.Climb",
    swim: "skills.skill.Swim",
    drive_auto: "skills.skill.Drive Auto",
    drive_other01_name: "skills.skill.Pilot",
    ride: "skills.skill.Ride",
    stealth: "skills.skill.Stealth",
    track: "skills.skill.Track",
    disguise: "skills.skill.Disguise",
    locksmith: "skills.skill.Locksmith",
    sleight_of_hand: "skills.skill.Sleight Of Hand",
    language_own: "skills.skill.Language (Own)",
    language_other_name: "skills.skill.Language (Other)",
    accounting: "skills.skill.Accounting",
    law: "skills.skill.Law",
    occult: "skills.skill.Occult",
    history: "skills.skill.History",
    natural_world: "skills.skill.Natural World",
    anthropology: "skills.skill.Anthropology",
    archaeology: "skills.skill.Archaeology",
    compute_use: "skills.skill.Computer Use",
    mech_repair: "skills.skill.Mechanical Repair",
    elec_repair: "skills.skill.Electrical Repair",
    op_hv_machine: "skills.skill.Operate Heavy Machinery",
    spot_hidden: "skills.skill.Spot Hidden",
    listen: "skills.skill.Listen",
    library_use: "skills.skill.Library Use",
    appraise: "skills.skill.Appraise",
    cthulhu_mythos: "skills.skill.Cthulhu Mythos",
    first_aid: "skills.skill.First Aid",
    medicine: "skills.skill.Medicine",
    dodge: "skills.skill.Dodge",
    fighting_brawl: "skills.skill.Fighting",
    throw:"skills.skill.Throw",
    firearms_handgun:"skills.skill.Firearms",
    firearms_rifle:"skills.skill.fire1",
}
const skillDefault = {
    "Psychology":10,
    "Credit Rating":0,
    "Persuade":10,
    "Fast-talk":5,
    "Intimidate":15,
    "Charm":15,
    "Navigate":10,
    "Survival":10,
    "Jump":20,
    "Climb":20,
    "Swim":20,
    "Drive Auto":20,
    "Pilot":0,
    "Ride":5,
    "Stealth":20,
    "Track":10,
    "Disguise":5,
    "Locksmith":1,
    "Sleight Of Hand":10,
    "Language (Own)":0,
    "Language (Other)":1,
    "Accounting":5,
    "Law":5,
    "Occult":5,
    "History":5,
    "Natural World":10,
   "Anthropology":1,
    "Archaeology":1,
    "Computer Use":5,
    "Mechanical Repair":10,
    "Electrical Repair":1,
    "Operate Heavy Machinery":1,
    "Spot Hidden":25,
    "Listen":20,
    "Library Use":20,
    "Appraise":5,
    "Cthulhu Mythos":0,
    "First Aid":30,
    "Medicine":1,
    "Dodge":0,
    "Fighting":25,
    "Throw":20,
    "Firearms":0,
    "fire1":0,
}

module.exports = (json)=>{
    const data ={}
    for (let key in json){
        if(!(key in map)) continue
        let arr = map[key].split('.')
        switch (arr.length) {
            case 2:
                if(!data[arr[0]]) data[arr[0]]={}
                data[arr[0]][arr[1]]=json[key]
                break
            case 3:
                if(!data[arr[0]]) data[arr[0]]={}
                if(!data[arr[0]][arr[1]]) data[arr[0]][arr[1]]={}
                if(arr[1]==='skill'){
                    let value= json[key]
                    if(['Survival','Pilot','Language (Other)'].includes(arr[2])){
                        data[arr[0]][arr[1]][arr[2]]={}
                        data[arr[0]][arr[1]][arr[2]].custom=value.split(':')[1]
                        data[arr[0]][arr[1]][arr[2]].interest= skillDefault[arr[2]]
                    }else {
                        value -= skillDefault[arr[2]]
                        if(value===0) continue
                        data[arr[0]][arr[1]][arr[2]]={}
                        if(arr[2]==='Dodge') value=0
                        data[arr[0]][arr[1]][arr[2]].interest= value
                    }

                }else {
                    data[arr[0]][arr[1]][arr[2]]=parseInt(json[key])
                }
                break
        }
    }
    return data
}

