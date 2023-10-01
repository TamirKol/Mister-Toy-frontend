import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { httpService } from '../services/http.service.js'
import { showSuccessMsg } from "../services/event-bus.service.js"

const BASE_URL = 'user/'
const LOGIN_URL = 'auth/login/'
const SIGNUP_URL = 'auth/signup/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    
}
window.us = userService

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

async function login({ username, password }) {
    const user = { username, password }
    try{
        const loggedInUser=await httpService.post( LOGIN_URL, user )
       if(loggedInUser)return _setLoggedinUser(loggedInUser)
    }
    catch(err){
        console.log(err)
    }
    finally{
        
    }
}
function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 0 }
    return httpService.post(SIGNUP_URL, user )
}
function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}