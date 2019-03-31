import React, { Component, Fragment } from 'react';
import Message from './Message';
import socket from '../../socket';

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      messages: [],
      height: 16,
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.emit('get', 'messages', this.props.game.name);

    socket.on('messages', ({ messages }) => {
      this.setMessages(messages);
      if (!this.state.loaded) {
        this.setState({ loaded: true }, () => this.setScroll());
      }
    });
  }

  setMessages(messages) {
    const el = document.querySelector('.chat-container');
    const cur = el.getBoundingClientRect().bottom + el.scrollTop;
    const notScrolling = cur === el.scrollHeight;

    this.setState({ messages }, () => {
      notScrolling && this.setScroll();
    });
  }

  setScroll() {
    const el = document.querySelector('.chat-container');
    el.scrollTop = el.scrollHeight;
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') this.handleSubmit(e);
  }

  componentWillUnmount() {
    socket.removeAllListeners('messages');
  }

  constructMessage() {
    return {
      type: 'message',
      message: this.state.message,
      player: this.props.player.playerNumber,
      room: this.props.game.name,
      date: `${Date.now()}-${this.props.player.playerNumber}`,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { messages } = this.state;
    const message = this.constructMessage();
    this.setState(
      {
        message: '',
        height: 37,
        messages: [...messages, message],
      },
      () => {
        socket.emit('message', message);
        this.setScroll();
      }
    );
  }

  handleChange(e) {
    const height = Math.floor((e.target.scrollHeight - 20) / 17) * 17 + 20;
    this.setState({ [e.target.name]: e.target.value, height });
  }

  render() {
    const { messages, height, message } = this.state;
    const { player } = this.props;
    return (
      <Fragment>
        <div className="chat-container">
          {messages.map((m, i) => (
            <Message
              style={i === 0 ? { marginTop: 'auto' } : {}}
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
      </Fragment>
    );
  }
}

export default Chat;
