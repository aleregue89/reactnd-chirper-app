// action type
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export function receiveTweets (tweets) {
    return {                                    // return an object or the action
        type: RECEIVE_TWEETS,
        tweets,
    }
}