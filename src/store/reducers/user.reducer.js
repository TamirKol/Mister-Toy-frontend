import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    watchedUser: null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break

        default:
            return state;
    }
}