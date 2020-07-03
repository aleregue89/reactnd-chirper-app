import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatTweet, formatDate} from '../utils/helpers'
import {TiArrowBackOutline} from 'react-icons/ti'
import {TiHeartOutline} from 'react-icons/ti'
import {TiHeartFullOutline} from 'react-icons/ti'
import {handleToggleTweet} from '../actions/tweets'
import {Link, withRouter} from 'react-router-dom'

class Tweet extends Component {

    handleLike = (event) => {
        event.preventDefault()
        
        // todo: handles like tweet
        const {dispatch, tweet, authedUser} = this.props

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }

    toParent = (event, id) => {
        event.preventDefault()
        // todo: redirect to parent tweet
        this.props.history.push(`/tweet/${id}`)
    }

    render() {
        const {tweet} = this.props

        if (tweet === null) {
            return <p>This tweet doesn't existed</p>
        }

        // destructuring all the properties we need from Tweets
        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet

        console.log(this.props)     // debbuging to see if I'm passing the data

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(event) => this.toParent(event, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweets-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{ replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            { hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />}
                        </button> 
                        <span>{likes !==0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({authedUser, users, tweets}, {id}) {    // connecting this component to the Redux Store (state)
    const tweet = tweets[id]                                     // if you pass the component you are rendering a Prop, is coming as the second argument
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null  // taking the data from the parentTweet 

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))