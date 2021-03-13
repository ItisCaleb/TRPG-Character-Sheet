import axios from 'axios'

const host = process.env.VUE_APP_BACKEND_URL || ''
axios.defaults.baseURL = `${host}/api`
axios.defaults.xsrfHeaderName='X-CSRF-Token'
axios.defaults.xsrfCookieName='csrfToken'

export default {
    login(data) {
        return ajax('user/userLogin', 'post', data)
    },
    googleLogin(data){
        return ajax('user/googleLogin','post',data)
    },
    oauthSignup(data){
        return ajax('user/oauthSignup','post',data)
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
    passwordMail(data){
        return ajax('user/forgetPassword','post',data)
    },
    checkChangePasswordExist(id){
        return ajax(`user/verifyChangePwd/${id}`,'get')
    },
    changePassword(id,data){
        return ajax(`user/changePassword/${id}`,'post',data)
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
    joinSession(code) {
        return ajax(`session/TRPGJoinSession?code=${code}`, 'get')
    },
    uploadSheet(data,id){
        return ajax(`session/uploadSheet/${id}`,'post',data)
    },
    removeSheet(id,session){
        return ajax(`session/removeSheet/${id}?session=${session}`,'delete')
    },
    deleteSession(id) {
        return ajax(`session/deleteSession/${id}`, 'delete')
    },
    createInviteLink(id){
        return ajax(`session/createInvite/${id}`,'get')
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
    importSheet(system,type,data){
        return ajax(`sheet/${system}/import/${type}`,'post',data)
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
            headers:{
                'Content-Type': type || 'application/json',
            },
            withCredentials: true
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response.data)
        })
    })
}
