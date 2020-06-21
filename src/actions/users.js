// action type
export  const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers (users) {
    return {                                // return an object or the action
        type: RECEIVE_USERS,
        users,
    }
}