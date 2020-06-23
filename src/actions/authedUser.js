// action type
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
    return {                            // return an object or the action
        type: SET_AUTHED_USER,
        id,
    }
}