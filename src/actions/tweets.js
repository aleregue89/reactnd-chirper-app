import {saveLikeToggle} from '../utils/api'
import {saveTweet} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

// action type
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export function receiveTweets (tweets) {
    return {                                    // return an object or the action
        type: RECEIVE_TWEETS,
        tweets,
    }
}

// action type
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

function toggleTweet ({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

// Thunk action creator
export function handleToggleTweet (info) {
    return(dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch((error) => {
                console.warn('Error in handleToggleTweet: ', error)
                dispatch(toggleTweet(info))
                alert('The was an error liking the tweet. Try again')
            })
    }
}

// action type
export const ADD_TWEET = 'ADD_TWEET'

// action creator
function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet,
    }
}

// thunk action creator
export function handleAddTweet (text, replyingTo) {
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveTweet ({
            text,
            author: authedUser,
            replyingTo
        })
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }
}