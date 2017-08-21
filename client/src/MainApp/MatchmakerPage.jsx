import React, { Component } from 'react';
import MatchmakerEvent from './MatchmakerEvent.jsx';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Slider from './Slider.jsx';
import jwt from 'jsonwebtoken';
import PopupChat from './PopupChat.jsx';

class MatchmakerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compatUsers: [],
      defaultValue: 50,
      currentUserName: '',
      ownUserName: this.props.auth.user.username,
      messages: [],
    };
    this.updateCompat = this.updateCompat.bind(this);
    this.updateDefaultValue = this.updateDefaultValue.bind(this);
    this.updateCurrentUserName = this.updateCurrentUserName.bind(this);
    this.newPost = this.newPost.bind(this)
  }

  newPost(post) {
    const socket = this.props.socket
    const message = {
      type: "postMessage",
      username: this.state.ownUserName,
      message: post,
    }
    // ws.send(JSON.stringify(message))
    this.setState({ input: ''})
    // console.log(JSON.stringify(message))
    const chatbar = document.getElementById('chatbar');
    chatbar.value = '';
    this.socket.emit('send message', JSON.stringify(message))
    console.log('message sent')
  }

  updateMessages(data) {
    const broadcastedMessage = this.state.messages.concat(data);
    this.setState({
      messages: broadcastedMessage
    });
    console.log('this.set.messages: ', this.state.messages)
  }

  updateCompat(users) {
    const filteredUsers = users.filter(user => user.username != this.state.currentUserName);
    this.setState({
      compatUsers: filteredUsers
    })
  }

  updateDefaultValue(seriousness) {
    this.setState({
      defaultValue: seriousness
    })
  }

  updateCurrentUserName(username){
    this.setState({
      currentUserName: username
    })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = io.connect('http://localhost:3001');

    var c = this;
    this.socket.on("connect", () => {
      console.log("Connected!");
      this.socket
      .emit('authenticate', {token: localStorage.jwtToken}) //send the jwt
      .on('authenticated', function (username) {
        console.log("DID THIS AUTHENTICATE??!!!", username);
        c.updateCurrentUserName(username);
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data));
        throw new Error(msg.data.type);
      })
      .on('getDefaultSeriousness', function(seriousness){
        console.log(JSON.parse(seriousness));
        c.updateDefaultValue(JSON.parse(seriousness));
      })
      .on('onlinematchedSeriousnessUserIds', function(users) {
        c.updateCompat(JSON.parse(users));
      })
      .on('respondToInvite', function(senderData, receiverData){
        const parsedReceiverData = JSON.parse(receiverData);
        if(parsedReceiverData.username === c.state.currentUserName){
          const parsedSenderData = JSON.parse(senderData);
          const senderDataArr = c.state.compatUsers.filter(user => user.username === parsedSenderData.username)
          const senderData = senderDataArr[0];
          console.log('Respond to ', senderData.username, ' ?');
        }
      })
      .on('new message', function(data){
        const messageData = JSON.parse(data)
        const message = {username: messageData.username,
                          content: messageData.message,}
        console.log(message)
        c.updateMessages(message);
      })
      .on('disconnect', function(){
        this.socket.emit('disconnect', c.state.currentUserName);
      })
    });
  }

  updateUserSeriousness = (value) => {
    this.updateDefaultValue(value);
    this.socket.emit('updateSeriousness', JSON.stringify({ value }));
  }

  inviteUserB = (userData) => {
    this.socket.emit('sendInvite', this.state.currentUserName, JSON.stringify(userData));
  }

  render () {
    return (
      <div className="matchmaker-container">
        <div className="slider-container">
          <Slider onSliderUpdate={ this.updateUserSeriousness } sliderDefaultValue={this.state.defaultValue}/>
        </div>
        <div className="matchmakerEventAndChat-container">
          <div>
            <MatchmakerEvent compatUsers={this.state.compatUsers} inviteUserB = {this.inviteUserB}/>  
          </div>
          <div>     
            <PopupChat newPost={this.newPost} ownUownUserName={this.state.ownUserName} messages={this.state.messages} /> 
          </div>
        </div>
      </div>
    );
  }
}

MatchmakerPage.PropTypes = {
  auth: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(MatchmakerPage);
