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
        return ajax(`session/getInfo/${id}`, 'get')
    },
    createSession(data) {
        return ajax('session/TRPGCreateSession', 'post', data)
    },
    joinSession(data) {
        return ajax('session/TRPGJoinSession', 'post', data)
    },
    uploadSheet(data,id){
        return ajax(`session/uploadSheet/${id}`,'post',data)
    },
    deleteSession(id) {
        return ajax(`session/deleteSession/${id}`, 'delete')
    },
    getSheets() {
        return ajax('sheet/getSheets', 'get')
    },
    getSheetData(id) {
        return ajax(`sheet/getSheetData/${id}`, 'get')
    },
    deleteSheet(id) {
        return ajax(`sheet/delete/${id}`, 'delete')
    },
    createSheet(system, name) {
        return ajax(`sheet/${system}/create/${name}`, 'get')
    },
    editSheet(system,id,data){
        return ajax(`sheet/${system}/edit/${id}`,"post",data)
    },
    checkSheetAccess(id){
        return ajax(`sheet/checkAccess/${id}`,'get')
    },
    getImage(type,id){
        return ajax(`image/getImage/${type}/${id}`)
    },
    uploadImage(system, id, data){
        return ajax(`image/uploadImage/${system}/${id}`,'post',data,'multipart/form-data;')
    },
    removeImage(system, id){
        return ajax(`image/removeImage/${system}/${id}`,'get')
    }

}

function ajax(url, method, data, type) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            data: data,
            'Content-Type': type || 'application/json',
            withCredentials: true
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response.data)
        })
    })
}
