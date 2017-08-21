import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card';

class MatchmakerEvent extends Component {
  render () {
    // data will be an array of objects(most probably JSON), which each objects will contain the information from a user: username, text description, avatar, etc
    // Each card should have an output for showing username, avatar, text description, and a button to send an invite
    const data = this.props.compatUsers
    console.log(data)
    return (
      <div>
        <Cards onEnd={() => console.log('end')} className='master-root'>
          { 
            data.map(item =>
                                   //make card and card border bigger
                                   //make sure it's mobile responsive
                                   <Card
                                     onSwipeLeft={() => console.log('reject ' + item.username)}
                                     onSwipeRight={() => {
                                      console.log('accept ' + item.username);
                                      this.props.inviteUserB(item);
                                     }}>
                                     <h2>{item.username}</h2>
                                     <img className="avatar" src={item.imageurl} alt="avatar image"/> 
                                     <p className="card-text-description">{item.tagline}</p>
                                     <p className="card-text-description">{item.blurb}</p>
                                   </Card>
                                   )}
        </Cards>
      </div>
    )
  }
}

export default MatchmakerEvent
