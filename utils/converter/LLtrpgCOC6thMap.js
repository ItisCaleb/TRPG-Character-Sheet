const axios = require('axios')

module.exports = url => {
    const id = url.split("/")[5]
    return new Promise((resolve, reject) => {
        axios.get(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`)
            .then(res => JSON.parse(res.data
                .replace("/*O_o*\/", "")
                .replace("google.visualization.Query.setResponse(", "")
                .replace(");", "")))
            .then(data => {
                resolve(new Sheet(data))
            })
            .catch(err => {
                reject("錯誤的網址或是此角色卡並不是公開的")
            })
    })
}

function columnParser(str) {
    str = str.toLowerCase()
    var sum = -26
    for (let i of str) {
        sum += 25
        sum += i.charCodeAt(0) - 96
    }
    return sum
}

class Sheet {
    info = {}
    stat = {}
    story = {}
    equip = {}
    skills = {}
    json

    constructor(json) {
        this.json = json
        this.info = {
            name: this.fieldGetter(0, "x"),
            player_name: this.fieldGetter(1, "x"),
            author: "",
            system: "COC6th"
        }
        this.stat = {
            hp: this.fieldGetter(10, "ao"),
            san: this.fieldGetter(14, "ao"),
            mp: this.fieldGetter(12, "ao"),
            insane_status: this.fieldGetter(15, "f"),
            injured_status: this.fieldGetter(16, "f"),
            characteristic: {
                str: this.fieldGetter(0, "am"),
                con: this.fieldGetter(2, "am"),
                dex: this.fieldGetter(4, "am"),
                app: this.fieldGetter(6, "am"),
                pow: this.fieldGetter(8, "am"),
                int: this.fieldGetter(0, "as"),
                siz: this.fieldGetter(2, "as"),
                edu: this.fieldGetter(4, "as"),
            }
        }
        this.story = {
            class: this.fieldGetter(2, "x"),
            age: this.fieldGetter(7, "x"),
            degree: this.fieldGetter(3, "x"),
            sex: this.fieldGetter(8, "x"),
            residence: this.fieldGetter(5, "x"),
            birthplace: this.fieldGetter(6, "x"),
            description: this.fieldGetter(19, "s"),
            trait: this.fieldGetter(20, "e"),
            encounter: this.fieldGetter(68, "b"),
        }
        this.equip = {
            equip: (() => {
                let str = ""
                for (let m = 11; m <= 16; m++) {
                    str += this.fieldGetter(m, "s") + " "
                    str += this.fieldGetter(m, "aa")
                }
                return str
            })(),
            cash: this.fieldGetter(17, "aa")
        }
        this.skills = {
            skill: (() => {
                var skills = {}
                for (let s = 32; s <= 65; s++) {
                    let name = this.fieldGetter(s, "d")
                    if (!name) name = this.fieldGetter(s, "b")
                    name = name.split("【")[0]
                    if (skillMap[name]
                        && (this.fieldGetter(s, "m")
                            || this.fieldGetter(s, "p")
                            || this.fieldGetter(s, "s"))) {
                        skills[skillMap[name]] = {
                            interest: this.fieldGetter(s, "p"),
                            class: this.fieldGetter(s, "m"),
                            grow: this.fieldGetter(s, "s")
                        }
                    }
                    name = this.fieldGetter(s, "aa")
                    if (!name) name = this.fieldGetter(s, "y")
                    name = name.split("【")[0]
                    if (skillMap[name]
                        && (this.fieldGetter(s, "aj")
                            || this.fieldGetter(s, "am")
                            || this.fieldGetter(s, "ap"))) {
                        skills[skillMap[name]] = {
                            interest: this.fieldGetter(s, "am"),
                            class: this.fieldGetter(s, "aj"),
                            grow: this.fieldGetter(s, "ap")
                        }
                    }
                }
                return skills
            })()
        }
    }

    fieldGetter(index, col) {
        try {
            return this.json.table.rows[index]["c"][columnParser(col)]["v"]
        } catch (err) {
            return ""
        }
    }
}

const skillMap = {
    "信用／信譽": "Credit Rating",
    "說服": "Persuade",
    "心理學": "Psychology",
    "哄騙／話術": "Fast-Talk",
    "議價": "Bargain",
    "閃躲／迴避": "Dodge",
    "攀爬": "Climb",
    "跳躍": "Jump",
    "導航": "Navigate",
    "駕駛汽車": "Pilot(Car)",
    "駕駛馬車": "Pilot(Carriage)",
    "騎馬": "Ride",
    "游泳": "Swim",
    "藏匿": "Conceal",
    "躲藏": "Hide",
    "潛行／匿蹤": "Stealth",
    "追蹤／跟蹤": "Track",
    "開鎖": "Locksmith",
    "偽裝": "Disguise",
    "急救": "First Aid",
    "醫學": "Medicine",
    "心理／精神分析": "Psychoanalysis",
    "投擲": "Throw",
    "霰彈槍": "Shotgun",
    "來福槍": "Rifle",
    "手槍": "Handgun",
    "衝鋒槍": "SMG",
    "機關槍": "Machine Gun",
    "其他": "Weapon",
    "母語": "Language (Own)",
    "歷史": "History",
    "自然科學／博物學": "Natural World",
    "法律": "Law",
    "考古學": "Archaeology",
    "人類學": "Anthropology",
    "生物學": "Biology",
    "電子學": "Electronics",
    "人類學": "Anthropology",
    "生物學": "Biology",
    "天文學": "Astronomy",
    "藥學": "Pharmacy",
    "化學": "Chemistry",
    "物理": "Physics",
    "其他語言": "Language (Other)",
    "機械維修": "Mechanical Repair",
    "電器維修": "Electrical Repair",
    "攝影／照相": "Photography",
    "重機械操作／控制": "Operate Heavy Machinery",
    "電腦使用": "Computer Use",
    "聆聽": "Listen",
    "圖書館使用": "Library Use",
    "偵查／觀察／調查": "Spot Hidden",
    "克蘇魯神話": "Cthulhu Mythos",
    "拳頭":"Weapon",
    "擒拿":"w1",
    "踢擊":"w3",
    "頭錘":"w2"
}


