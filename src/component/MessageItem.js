import React, { Component } from 'react';

export default class MessageItem extends Component {

  render() {
    const { fromMe, text} = this.props;
    return (
      <div className={`message-item ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
        <span>{text}</span>
      </div>
    );
  }
}