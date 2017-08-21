import React, { Component } from 'react';
//Used react-popupbox because of ease of integration. However, if given more time, would have switched it to the official reactjs 'react-modal' package that has the same functionality https://reactcommunity.org/react-modal/
import { connect } from 'react-redux';
import io from 'socket.io-client';

class PopupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.auth.user.username,
      input: '',
    }
    // this.newPost = this.newPost.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  componentDidMount() {
    console.log("PopupChat component mounted");
  }
  
  // newPost() {
  //   const socket = this.props.socket
  //   const message = {
  //     type: "postMessage",
  //     username: this.state.currentUser,
  //     message: this.state.input,
  //   }
  //   // ws.send(JSON.stringify(message))
  //   this.setState({ input: ''})
  //   // console.log(JSON.stringify(message))
  //   const chatbar = document.getElementById('chatbar');
  //   chatbar.value = '';
  //   socket.emit('send message', JSON.stringify(message))
  //   console.log('message sent')
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const messageList = this.props.messages.map((message) => {
          return (<div key={message.id} className="message">
            <span >{message.username}: {message.content}</span>
          </div>);
        })
    return (
      //Pop up currently triggered by a button click
      //Eventually, the popup should be activated by an accepted invitation from a potential teammate
      <div className="bordered">
        <div className="messagelist">{messageList}</div>

        <div>
          <input
            name="input"
            id="chatbar"
            placeholder="Type a message and hit ENTER"
            onChange={this.onChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                this.props.newPost(this.state.input);
                const element = document.getElementsByClassName('messagelist');
                element.scrollIntoView(false);
              }
            }}
          />
        </div>

      </div>
    )
  }
}

PopupChat.PropTypes = {
  auth: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(PopupChat);