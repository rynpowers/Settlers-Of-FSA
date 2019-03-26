import React, { Component, Fragment } from 'react';
import Chat from './Chat';
import Trade from './Trade';
import socket from '../../socket';

const style = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  height: '100%',
};

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      resources: {
        forest: 0,
        hill: 0,
        pasture: 0,
        mountain: 0,
        field: 0,
      },
      message: '',
      height: 16,
    };

    this.interval = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.emit('get-messages', this.props.game.name);

    this.interval = setInterval(() => {
      socket.emit('get-messages', this.props.game.name);
    }, 10000);

    socket.on('trade-messages', messages => {
      this.setMessages(messages);
    });
  }

  setMessages(messages) {
    this.setState({ messages }, () => {
      const el = document.querySelector('.chat-container');
      const cur = el.getBoundingClientRect().bottom + el.scrollTop;
      if (cur >= el.scrollHeight - 50) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') this.handleSubmit(e);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    socket.removeAllListeners('trade-messages');
  }

  constructMessage() {
    return {
      type: 'message',
      message: this.state.message,
      player: this.props.playerNumber,
      room: this.props.game.name,
      date: `${Date.now()}-${this.props.playerNumber}`,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { messages } = this.state;
    const message = this.constructMessage();
    this.setState(
      { message: '', height: 37, messages: [...messages, message] },
      () => {
        socket.emit('message', message);
      }
    );
  }

  handleChange(e) {
    const height = Math.floor((e.target.scrollHeight - 20) / 17) * 17 + 20;
    this.setState({ [e.target.name]: e.target.value, height });
  }

  render() {
    const { resources, messages, message, height } = this.state;
    const { player } = this.props;
    return (
      <div style={style}>
        <Trade resources={resources} player={player} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <div className="chat-container">
            {messages.map(m => (
              <Chat
                key={m.date}
                message={m.message}
                player={m.player}
                playerNumber={player.playerNumber}
              />
            ))}
          </div>
          <form
            onKeyPress={this.handleKeyPress}
            onSubmit={this.handleSubmit}
            className="chat-form"
          >
            <button type="submit">Send</button>
            <textarea
              style={{ height }}
              onChange={this.handleChange}
              name="message"
              value={message}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default TradeView;
