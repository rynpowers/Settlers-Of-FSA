import React, { Component, Fragment } from 'react';
import Chat from './Chat';
import Trade from './Trade';
import socket from '../../socket';

const style = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
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
    };
    this.interval = null;
  }

  componentDidMount() {
    socket.emit('get-messages', this.props.game.name);

    this.interval = setInterval(() => {
      console.log('sending request');
      socket.emit('get-messages', this.props.game.name);
    }, 10000);

    socket.on('trade-messages', messages => {
      console.log(messages);
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { resources, messages, message } = this.state;
    const { player } = this.props;
    return (
      <div style={style}>
        <Trade resources={resources} player={player} />
        <div style={{ padding: '3rem' }}>
          {messages.map(m => (
            <Chat
              key={m}
              message={m.message}
              player={m.player}
              playerNumber={player.playerNumber}
            />
          ))}
          <input value={message} />
        </div>
      </div>
    );
  }
}

export default TradeView;
