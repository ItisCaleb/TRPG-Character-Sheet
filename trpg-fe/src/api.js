import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

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
    mailVerify(id){
        return ajax(`user/register/${id}`,'get')
    },
    authVerify() {
        return ajax('user/authVerify', 'get')
    },
    getUser(name) {
        return ajax(`user/getUser/${name}`,'get')
    },
    getSession(){
        return ajax('session/getSession','get')
    },
    createSession(data){
        return ajax('session/TRPGCreateSession','post',data)
    },
    joinSession(data){
        return ajax('session/TRPGJoinSession','post',data)
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
