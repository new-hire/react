import React from 'react';
import UserInput from './component/UserInput';
import MessageList from './component/MessageList';
import Messager from './component/Messager';
import moment from 'moment';
import './App.css';

const initialState = {
  newMessage: '',
  chats: [
    {
      target: {
        name: 'Elly',
        profilePic: 'http://lorempixel.com/100/100/cats/3'
      },
      messages: [
        { fromMe: false, text: '來來來!!', timestamp: 1562556665 },
        { fromMe: false, text: '來甲本~', timestamp: 1562556665 },
        { fromMe: false, text: '要吃嗎?', timestamp: 1562556665 },
        { fromMe: true, text: '一起吃!!', timestamp: 1562556665 },
        { fromMe: true, text: '約哪裡?', timestamp: 1562556665 },
      ]
    },
    {
      target: {
        name: 'Mercy',
        profilePic: 'http://lorempixel.com/100/100/cats/2'
      },
      messages: [
        { fromMe: false, text: '我要報表!', timestamp: 1562556665 },
      ]
    },
    {
      target: {
        name: 'Cat',
        profilePic: 'http://lorempixel.com/100/100/cats/5'
      },
      messages: [
        { fromMe: false, text: '喵嗚～', timestamp: 1562556665 },
      ]
    }
  ],
  chatIndex: 0
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  handleMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleMessagerChange(event) {
    this.setState({ chatIndex: event });
  }

  handleKeyDown(event) {
    const text = event.target.value;
    const timestamp = moment().unix();
    const addMessage = {fromMe: true, text, timestamp};

    if (event.keyCode === 13 && text !== '') {
      const {chats, chatIndex} = this.state;
      chats[chatIndex].messages.push(addMessage);

      this.setState({
        newMessage: '',
        chats: chats
      });
    }
  }
  render() {
    const { chats, chatIndex } = this.state;
    return (
      <div className="chat-app clearfix">
        <div className="chat-app_left">
          <div className="heading">
            <h3 className="messenger-title">Messager</h3>
          </div>
          <div className="thread-list">
            {chats.map((thread, id) => {
              const { target, messages } = thread;
              const lastMessage = messages[messages.length - 1];
              return (
                <Messager
                  key={id}
                  src={target.profilePic}
                  name={target.name}
                  content={lastMessage.text}
                  timestamp={lastMessage.timestamp}
                  handleMessagerChange={this.handleMessagerChange.bind(this, id)}
                />
              );
            })}
          </div>
        </div>
        <div className="chat-app_right">
          <div className="heading">
            <div className="current-target">{chats[chatIndex].target.name}</div>
          </div>
          <div className="message-list">
            {<MessageList threads={chats} index={chatIndex} />}
          </div>
          <div className="footer">
            {<UserInput newMessage={this.state.newMessage}
                       messageChange={this.handleMessageChange.bind(this)}
                       handleKeyDown={this.handleKeyDown.bind(this)} />}
          </div>
        </div>
      </div>
    );
  }
}
