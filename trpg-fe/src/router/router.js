import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
import store from "@/store/index"

Vue.use(VueRouter)

function checkLogin(to,from,next){
    if(!store.getters.getLogin) next({name:"Login"})
    else next()
}

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About'),
        meta: {
            title: "關於"
        }

    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../views/Privacy'),
        meta: {
            title: "隱私政策"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/User/Login'),
        meta: {
            title: "登入"
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/User/Signup'),
        meta: {
            title: "註冊"
        }
    },
    {
        path: '/oauth/:token',
        name: 'OAuth',
        component: () => import('../views/User/OAuthSignup')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/User/Logout')
    },
    {
        path: '/forget_password',
        component: () => import('../views/User/SendFindPassword'),
        meta: {
            title: "忘記密碼"
        }
    },
    {
        path: '/change_password/:id',
        component: () => import('../views/User/ChangePassword')
    },
    {
        path: '/verify/:id',
        name: 'MailVerify',
        component: () => import('../views/User/MailVerify')
    },
    {
        path: '/home/:name',
        name: 'Home',
        component: () => import('../views/User/Home'),
        meta: {
            title: "個人設定"
        }
    },
    {
        path: '/session',
        name: 'Session',
        component: () => import('../views/Session'),
        meta: {
            title: "團務"
        },
        beforeEnter:checkLogin
    },
    {
        path: '/session/create',
        component: () => import('../views/Session/SessionCreate'),
        meta: {
            title: "創建團務"
        },
        beforeEnter:checkLogin
    },
    {
        path: '/session/join',
        component: () => import('../views/Session/SessionJoin'),
        meta: {
            title: "加入團務"
        },
        beforeEnter:checkLogin
    },
    {
        path: '/session/info/:id',
        component: () => import('../views/Session/SessionInfo'),
        meta: {
            title: "團務詳情"
        },
        beforeEnter:checkLogin
    },
    {
        path: '/session/link/:code',
        component: () => import('../views/Session/SessionLinkJoin'),
        beforeEnter:checkLogin
    },
    {
        path: '/sheet',
        name: 'Sheet',
        component: () => import('../views/Sheet'),
        meta: {
            title: "角色卡"
        },
        beforeEnter:checkLogin
    },
    {
        path: '/sheet/:system/:id',
        name: 'SheetEdit',
        component: () => import('../views/Sheet/SheetEdit'),
    },
    {
        path: '/sheet/:system/:id',
        name: 'SheetView',
        component: () => import('../views/Sheet/SheetView'),
        props: route => ({
            session: route.params.session
        })
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound'),
        meta: {
            title: "404"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
