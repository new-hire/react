import React, { Component } from 'react';
import moment from 'moment';

export default class Messager extends Component {

  render() {
    const { src, name, content, timestamp, handleMessagerChange } = this.props;

    return (
      <li className="thread-item" onClick={handleMessagerChange} style={{cursor: 'pointer'}}>
        <div className="clearfix">
          <div className="thread-item_left">
            <img className="img-circle img" style={{width: '50px', height: '50px'}} src={src} alt=""/>
          </div>
          <div className="thread-item_right">
            <div className="thread-from">
              {name}
            </div>
            <div>
              <span className="thread-content">{content}</span>
            </div>
            <span className="thread-time">{moment.utc(moment(timestamp * 1000)).local().format()}</span>
          </div>
        </div>
      </li>
    );
  }
}