import React, { Component } from 'react';
import MatchmakerEvent from './MatchmakerEvent.jsx';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Slider from './Slider.jsx';
import jwt from 'jsonwebtoken';
import PopupChat from './PopupChat.jsx';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
const uuidv4 = require('uuid/v4');

class MatchmakerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compatUsers: [],
      defaultValue: 4000,
      currentUserName: '',
      ownUserName: this.props.auth.user.username,
      messages: [],
      showChat: false,
      roomName: ''
    };
    this.updateCompat = this.updateCompat.bind(this);
    this.updateDefaultValue = this.updateDefaultValue.bind(this);
    this.updateCurrentUserName = this.updateCurrentUserName.bind(this);
    this.newPost = this.newPost.bind(this)
    this.acceptInvitation = this.acceptInvitation.bind(this)
    this.completeUserInvitation = this.completeUserInvitation.bind(this)
    this.updateUserSeriousness = this.updateUserSeriousness.bind(this)
    this.inviteUserB = this.inviteUserB.bind(this)
  }

  openPopupbox(senderData, receiverData) {
    const content = (
      <div>
        <div className="notif-avatar-div">
          <img className="notif-avatar" src={"https://api.adorable.io/avatars/285/" + senderData.username + "@adorable.io.png"} /> 
        </div>
        <div className="notif-username">
          {senderData.username}
        </div>
        <div className="notif-tagline">
          {senderData.tagline}
        </div>
        <br/>
        <div>
          {senderData.blurb}
        </div>
        <br/>
        <div className="notif-btn">
          <button className="btn btn-lg" onClick={(event) => { this.acceptInvitation(senderData, receiverData); this.closePopupBox() }}>Accept</button>
          <button className="btn btn-lg" onClick={(event) => { this.closePopupBox() }}>Decline</button>
        </div>
      </div>
    )
    PopupboxManager.open({ content })
  }
  closePopupBox() {
    PopupboxManager.close()
  }

  acceptInvitation(senderData, receiverData) {
    const socket = this.props.socket
    senderData.roomName = uuidv4()
    this.socket.emit('accepted invitation', JSON.stringify(senderData), JSON.stringify(receiverData))
    this.setState({ showChat: true, roomName: senderData.roomName })
  }

  completeUserInvitation(senderData, receiverData) {
    const parsedSenderData = JSON.parse(senderData)
    this.socket.emit('completed invitation process', senderData, receiverData)
    this.setState({ roomName: parsedSenderData.roomName })
  }

  newPost(post) {
    const socket = this.props.socket
    const message = {
      type: "postMessage",
      username: this.state.ownUserName,
      message: post,
    }
    this.setState({ input: '' })
    const chatbar = document.getElementById('chatbar');
    chatbar.value = '';
    this.socket.emit('send message', JSON.stringify(message), this.state.roomName)
  }

  updateMessages(data) {
    const broadcastedMessage = this.state.messages.concat(data);
    this.setState({
      messages: broadcastedMessage
    });
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

  updateCurrentUserName(username) {
    this.setState({
      currentUserName: username
    })
  }

  componentDidMount() {
    this.socket = io.connect('http://localhost:3001');

    var c = this;
    this.socket.on("connect", () => {
      console.log("Connected!");
      this.socket
        .emit('authenticate', { token: localStorage.jwtToken }) //send the jwt
        .on('authenticated', function (username) {
        })
        .on('unauthorized', function (msg) {
          throw new Error(msg.data.type);
        })
        .on('getDefaultSeriousness', function (seriousness) {
          c.updateDefaultValue(JSON.parse(seriousness));
        })
        .on('onlinematchedSeriousnessUserIds', function (users, username) {
          c.updateCurrentUserName(username);
          c.updateCompat(JSON.parse(users));
        })
        .on('respondToInvite', function (senderData, receiverData) {
          const parsedSenderData = JSON.parse(senderData);
          const parsedReceiverData = JSON.parse(receiverData);
          if (parsedReceiverData.username === c.state.currentUserName) {
            const senderDataArr = c.state.compatUsers.filter(user => user.username === parsedSenderData.username)
            const senderData = senderDataArr[0];
            c.openPopupbox(parsedSenderData, parsedReceiverData)
          }
        })
        .on('new message', function (data) {
          const messageData = JSON.parse(data)
          const message = {
            username: messageData.username,
            content: messageData.message,
          }
          c.updateMessages(message);
        })
        .on('receive accepted invitation', function (senderData, receiverData) {
          const parsedSenderData = JSON.parse(senderData)
          if (c.state.currentUserName === parsedSenderData.username) {
            c.completeUserInvitation(senderData, receiverData)
            c.setState({ showChat: true });
          }
        })
    });
  }

  componentWillUnmount() {
    if(this.socket){
      this.socket.disconnect();
    }
  }

  updateUserSeriousness(value) {
    this.updateDefaultValue(value);
    this.socket.emit('updateSeriousness', JSON.stringify({ value }));
  }

  inviteUserB(userData) {
    this.socket.emit('sendInvite', this.state.currentUserName, JSON.stringify(userData));
  }

  render() {
    return (
      <div className="matchmaker-container">
        <div className="slider-container">
          <Slider onSliderUpdate={this.updateUserSeriousness} sliderDefaultValue={this.state.defaultValue} />
        </div>
        <div className="matchmakerEventAndChat-container">
          <div>
            <MatchmakerEvent compatUsers={this.state.compatUsers} inviteUserB = {this.inviteUserB} ownUserName={this.state.ownUserName}/>
          </div>
          {this.state.showChat &&
          <div>
            <PopupChat newPost={this.newPost} ownUownUserName={this.state.ownUserName} messages={this.state.messages} />
          </div>}
        </div>
        <PopupboxContainer />
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
