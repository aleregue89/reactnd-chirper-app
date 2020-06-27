import {getInitialData} from '../utils/api'
import {receiveUsers} from '../actions/users'       // importing action creators
import {receiveTweets} from '../actions/tweets'     // importing action creators
import {setAuthedUser} from '../actions/authedUser' // importing action creators
import {showLoading, hideLoading, LoadingBar} from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'  // saving or user on a constant


// we are using a Redux-Thunk pattern because with want to use a Async function
export function handleInitialData () {
    return (dispatch) => {  //redux-thunk pattern
        dispatch(showLoading())
        return getInitialData()
            .then(({users, tweets}) => { // we are receiving an object with users and tweers properties
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}