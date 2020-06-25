import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component {
    render () {
        console.log(this.props)  // debbuging if I'm passing the data
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetsIds.map((id) => (
                        <li key={id}>
                            <div>Tweet ID: {id}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({tweets}) {     // I need the tweets data from our Redux Store
    return {
        tweetsIds: Object.keys(tweets)
            .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)

