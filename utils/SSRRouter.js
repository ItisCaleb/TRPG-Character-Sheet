const {match} = require('path-to-regexp')

module.exports =async function (req, res, next) {
    for (let i in routes) {
        let route = routes[i]
        let exp = match(route.path, {decode: decodeURIComponent})
        let obj = exp(req.path)
        if (obj) {
            if (typeof route.title === "string") {
                req.title = `TRPG Toaster · ${route.title}`
                return next()
            } else if (typeof route.title === "function") {
                req.title = `TRPG Toaster · ${await route.title(obj.params)}`
                return next()
            }
        }
    }
    next()

}
const routes = [
    {
        path: "/about",
        title: "關於"
    },
    {
        path: "/privacy",
        title: "隱私政策"
    },
    {
        path: "/login",
        title: "登入",
    },
    {
        path: "/signup",
        title: "註冊",
    },
    {
        path: "/session",
        title: "團務",
    },
    {
        path: "/session/create",
        title: "創建團務",
    },
    {
        path: "/session/join",
        title: "加入團務",
    },
    {
        path: "/session/info/:id",
        title: "團務詳情",
    },
    {
        path:"/session/link/:code",
        title: async params=>{
            const info = await (require('../model/SessionLink').findOne({code:params.code}))
            if(!info) return "此連結無效或已經過期"
            const session = await (require('../model/Session').findOne({_id:info._id}))
            return `加入團務-${session.name}`
        }
    },
    {
        path: "/sheet",
        title: "角色卡",
    },
    {
        path: "/sheet/COC7th/:id",
        title: async params => {
            const info = await (require('../model/SheetInfo').findOne({_id: params.id, system: "COC7th"}))
            if (!info) return "此角色不存在"
            return `COC7th · ${info.name}`
        },
    },
    {
        path: "/sheet/COC6th/:id",
        title: async params => {
            const info = await (require('../model/SheetInfo').findOne({_id: params.id, system: "COC6th"}))
            if (!info) return "此角色不存在"
            return `COC6th · ${info.name}`
        },
    },
    {
        path: "/sheet/DND5e/:id",
        title: async (params) => {
            const info = await (require('../model/SheetInfo').findOne({_id: params.id, system: "DND5e"}))
            if (!info) return "此角色不存在"
            return `DND5e · ${info.name}`
        },
    },
]
