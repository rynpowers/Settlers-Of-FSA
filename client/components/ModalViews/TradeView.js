import React, { Component, Fragment } from 'react';
import Chat from './Chat';
import Trade from './Trade';
import TradeCreate from './TradeCreate';
import TradeOffer from './TradeOffer';
import socket from '../../socket';
import './TradeView.scss';

const initTrades = {
  2: { forest: -1, hill: 3, pasture: 3, mountain: -2, field: 3 },
  3: { forest: -2, hill: 2, pasture: 2, mountain: -3, field: 2 },
  4: { forest: -3, hill: 1, pasture: 1, mountain: -1, field: 1 },
};

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      messages: [],
      selectedTrade: 0,
      trades: { ...initTrades },
      message: '',
      height: 16,
    };

    this.interval = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewTrade = this.handleViewTrade.bind(this);
    this.handleSendResources = this.handleSendResources.bind(this);
  }

  componentDidMount() {
    socket.emit('get-messages', this.props.game.name);

    this.interval = setInterval(() => {
      socket.emit('get-messages', this.props.game.name);
    }, 10000);

    socket.on('trade-messages', messages => {
      this.setMessages(messages);
      if (!this.state.loaded) {
        this.setState({ loaded: true }, () => this.setScroll());
      }
    });
  }

  handleSendResources(resources) {
    socket.emit('incoming-trade', {
      type: 'trade',
      player: this.props.playerNumber,
      room: this.props.game.name,
      resources,
    });
  }

  handleViewTrade(selectedTrade) {
    this.setState({ selectedTrade });
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
        this.setScroll();
      }
    );
  }

  handleChange(e) {
    const height = Math.floor((e.target.scrollHeight - 20) / 17) * 17 + 20;
    this.setState({ [e.target.name]: e.target.value, height });
  }

  render() {
    const { trades, selectedTrade, messages, message, height } = this.state;
    const { player, playerNumber, game } = this.props;
    return (
      <div className="trade">
        <div className="trade-windows">
          <div className="trade-windows-create">
            {this.state.selectedTrade ||
            playerNumber !== game.playerTurn + 1 ? (
              <Fragment>
                <div
                  style={{ display: !this.state.selectedTrade && 'none' }}
                  onClick={() => this.setState({ selectedTrade: 0 })}
                  className="modal-close"
                >
                  <div />
                </div>
                <Trade
                  hidden={playerNumber === game.playerTurn + 1}
                  resources={trades[selectedTrade]}
                  player={player}
                  handleClick={this.handleClick}
                />
              </Fragment>
            ) : (
              <TradeCreate
                player={player}
                handleSubmitCB={this.handleSendResources}
              />
            )}
          </div>
          <div className="trade-windows-offers">
            {Object.keys(this.state.trades)
              .filter(trade => trade != playerNumber)
              .map(trade => (
                <TradeOffer
                  key={trade}
                  player={trade}
                  resources={this.state.trades[trade]}
                  selectedTrade={selectedTrade}
                  handleViewTrade={this.handleViewTrade}
                />
              ))}
          </div>
        </div>
        <div className="trade-chat">
          <div className="chat-container">
            {messages.map((m, i) => (
              <Chat
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
        </div>
      </div>
    );
  }
}

export default TradeView;
