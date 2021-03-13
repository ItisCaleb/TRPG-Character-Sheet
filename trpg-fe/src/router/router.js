import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/User/Login')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/User/Signup')
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
        component: () => import('../views/User/SendFindPassword')
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
        component: () => import('../views/User/Home')

    },
    {
        path: '/session',
        name: 'Session',
        component: () => import('../views/Session')
    },
    {
        path: '/session/create',
        component: () => import('../views/Session/SessionCreate')
    },
    {
        path: '/session/join',
        component: () => import('../views/Session/SessionJoin')
    },
    {
        path: '/session/info/:id',
        component: () => import('../views/Session/SessionInfo')
    },
    {
        path: '/session/link/:code',
        component: () => import('../views/Session/SessionLinkJoin')
    },
    {
        path: '/sheet',
        name: 'Sheet',
        component: () => import('../views/Sheet')
    },
    {
        path: '/sheet/COC7th/:id',
        name: 'COC7th',
        component: () => import('../views/Sheet/COC7th'),
    },
    {
        path: '/sheet/COC7th/:id',
        name: 'COC7thView',
        component: () => import('../views/Sheet/COC7thView')
    },
    {
        path: '/sheet/COC6th/:id',
        name: 'COC6th',
        component: () => import('../views/Sheet/COC6th'),
    },
    {
        path: '/sheet/COC6th/:id',
        name: 'COC6thView',
        component: () => import('../views/Sheet/COC6thView')
    },
    {
        path: '/sheet/DND5e/:id',
        component: () => import('../views/Sheet/DND5e')
    },
    {
        path: '/sheet/DND5e/:id',
        name: 'DND5eView',
        component: () => import('../views/Sheet/DND5eView')
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/About')
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
