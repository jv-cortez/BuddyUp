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
      showHiddenChat: false
    }
    this.onChange = this.onChange.bind(this);
  }
  
  toggleHiddenChat = () => {
    this.setState({ showHiddenChat: !this.state.showHiddenChat })
  }
  
  componentDidMount() {
    console.log("PopupChat component mounted");
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  componentDidUpdate() {
    const element = document.getElementById('newMessage');
    element.scrollTop = element.scrollHeight;
    event.preventDefault();
  }

  render() {
    const messageList = this.props.messages.map((message) => {
          return (<div key={message.id} className="message">
            <span >{message.username}: {message.content}</span>
          </div>);
        })
    const className = this.state.showHiddenChat ? "messagelist shown" : "messagelist bottom";
    return (
      <div className={className}>
        <p className="chatheaderClicked" onClick={ this.toggleHiddenChat }>Chat</p>
        <div className="message" id="newMessage">{ messageList }</div>
          <input
            name="input"
            id="chatbar"
            placeholder="Type a message and hit ENTER"
            onChange={ this.onChange }
            onKeyDown={ (event) => {
              if (event.key === 'Enter') {
                this.props.newPost(this.state.input);
              }
            }}
          />
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