import React, { Component } from 'react';

export default class UserInput extends Component {

  render() {
    const { newMessage, messageChange, handleKeyDown} = this.props;
    return (
      <input className="new-message"
             value={newMessage}
             onChange={messageChange}
             onKeyDown={handleKeyDown} />
    );
  }
}