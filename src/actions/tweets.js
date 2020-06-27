import {saveLikeToggle} from '../utils/api'

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