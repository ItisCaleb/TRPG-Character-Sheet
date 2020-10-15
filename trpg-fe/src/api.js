import axios from 'axios'

const host = process.env.VUE_APP_BACKEND_URL || ''
axios.defaults.baseURL = `${host}/api`

export default {
    login(data) {
        return ajax('user/userlogin', 'post', data)
    },
    signup(data) {
        return ajax('user/authed', "post", data)
    },
    logout() {
        return ajax('user/logout', 'get')
    },
    mailVerify(id) {
        return ajax(`user/register/${id}`, 'get')
    },
    authVerify() {
        return ajax('user/authVerify', 'get')
    },
    getUser(name) {
        return ajax(`user/getUser/${name}`, 'get')
    },
    getSessions() {
        return ajax('session/getSessions', 'get')
    },
    getSessionInfo(id) {
        return ajax(`session/getInfo/${id}`,'get')
    },
    createSession(data) {
        return ajax('session/TRPGCreateSession', 'post', data)
    },
    joinSession(data) {
        return ajax('session/TRPGJoinSession', 'post', data)
    },
    deleteSession(id) {
        return ajax(`session/deleteSession/${id}`,'get')
    },
    getSheets() {
        return ajax('sheet/getSheets', 'get')
    },
    createSheet(system, name) {
        return ajax(`sheet/${system}/create/${name}`)
    }

}

function ajax(url, method, data) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            data: data,
            'Content-Type': 'application/json',
            withCredentials: true
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response.data)
        })
    })
}
