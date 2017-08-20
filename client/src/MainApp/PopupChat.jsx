import React, { Component } from 'react';
//Used react-popupbox because of ease of integration. However, if given more time, would have switched it to the official reactjs 'react-modal' package that has the same functionality https://reactcommunity.org/react-modal/
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';

class PopupChat extends Component {
  openPopupbox = () => {
    const content = (
      <div>
        <span>MessageList</span>
          <input 
            className = "chat-message" 
            placeholder = "Type a message and hit ENTER"
          />
        <button className="demo-button" onClick={ this.updatePopupbox }>Send</button>
      </div>
    )

    PopupboxManager.open({ 
      content,
      config: {
        titleBar: {
          enable: true,
          text: 'From: Username A'
        }
      }
    })
  }

  updatePopupbox = () => {
    const content = (
      <div>
        <span>MessageList</span>
          <input 
            className = "chat-message" 
            placeholder = "Type a message and hit ENTER"
          />
          <button className="demo-button" onClick={ this.openPopupbox }>Send</button>
      </div>
    )

    PopupboxManager.update({
      content,
      config: {
        titleBar: {
          text:'From: Username B',
          closeButton: true
        }
      }
    })
  }

  render() {
    return (
    //Pop up currently triggered by a button click
    //Eventually, the popup should be activated by an accepted invitation from a potential teammate
    <div>
      <button className="popupbox-trigger" onClick={ this.openPopupbox }>Click me</button>
      <PopupboxContainer />
    </div>
    )
  }
}

export default PopupChat;