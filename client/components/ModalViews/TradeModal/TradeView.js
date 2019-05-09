import React, { Component, Fragment } from 'react';
import Chat from './Chat';
import Trade from './Trade';
import TradeCreate from './TradeCreate';
import { ResourcePanel } from '../../ResourceComponents';
import TradeOffer from './TradeOffer';
import socket from '../../../socket';
import './TradeView.scss';

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrade: 0,
      trades: {},
      offered: false,
      loaded: false,
    };
    this.handleViewTrade = this.handleViewTrade.bind(this);
    this.handleAcceptTrade = this.handleAcceptTrade.bind(this);
    this.handleRejectTrade = this.handleRejectTrade.bind(this);
    this.handleSendResources = this.handleSendResources.bind(this);
  }

  componentDidMount() {
    if (this.props.playerNumber === this.props.game.playerTurn) {
      socket.emit('updateGame', {
        type: 'game',
        game: this.props.game.name,
        payload: { mode: 'trade' },
      });
    }
    socket.emit('get', 'trades', this.props.game.name);
    socket.on('trades', ({ trades }) => {
      this.setState({
        trades,
        offered: !!trades[this.props.playerNumber],
        loaded: true,
      });
    });
  }

  componentWillUnmount() {
    socket.removeAllListeners('trades');
    if (this.props.playerNumber === this.props.game.playerTurn) {
      socket.emit('updateGame', {
        type: 'game',
        game: this.props.game.name,
        payload: { mode: '' },
      });
    }
  }

  handleViewTrade(selectedTrade) {
    this.setState({ selectedTrade });
  }

  reversePerspective(resources) {
    return Object.keys(resources).reduce((a, v) => {
      a[v] = resources[v] ? resources[v] * -1 : 0;
      return a;
    }, {});
  }

  filterTrades(playerNumber, prevState) {
    return Object.keys(prevState.trades)
      .filter(player => player != playerNumber)
      .reduce((a, v) => {
        a[v] = prevState.trades[v];
        return a;
      }, {});
  }

  handleRejectTrade(playerNumber) {
    this.setState(
      prevState => ({
        trades: this.filterTrades(playerNumber, prevState),
        selectedTrade: 0,
      }),
      () => {
        socket.emit('incoming-trade', {
          player: playerNumber,
          type: 'trade',
          action: 'reject',
          game: this.props.game.name,
        });
      }
    );
  }

  handleAcceptTrade(playerNumber) {
    socket.emit('incoming-trade', {
      player: playerNumber,
      type: 'trade',
      action: 'accept',
      game: this.props.game.name,
    });
  }

  handleSendResources(resources) {
    this.setState(prevState => ({
      trades: {
        ...prevState.trades,
        [this.props.playerNumber]: resources,
      },
      offered: true,
    }));
    socket.emit('incoming-trade', {
      type: 'trade',
      action: 'add',
      player: this.props.player.playerNumber,
      game: this.props.game.name,
      resources,
    });
  }

  render() {
    const { trades, selectedTrade, offered } = this.state;
    const { player, playerNumber, game } = this.props;

    if (!this.state.loaded) return <div>loading...</div>;

    return (
      <div className="trade">
        <div className="trade-windows">
          <div className="trade-windows-create">
            {offered || selectedTrade || playerNumber == game.playerTurn ? (
              <Fragment>
                <div
                  style={{ display: !this.state.selectedTrade && 'none' }}
                  onClick={() => this.setState({ selectedTrade: 0 })}
                  className="modal-close"
                >
                  <div />
                </div>
                <Trade
                  hidden
                  resources={
                    offered
                      ? this.reversePerspective(trades[playerNumber])
                      : trades[selectedTrade]
                  }
                  player={player}
                  handleClick={this.handleClick}
                />
              </Fragment>
            ) : (
              <TradeCreate
                player={player}
                game={game}
                hidden={this.state.trades[playerNumber]}
                handleSubmitCB={this.handleSendResources}
              />
            )}
          </div>
          <div className="trade-windows-offers">
            {Object.keys(this.state.trades).map(trade => (
              <TradeOffer
                key={trade}
                trade={trade}
                player={player}
                game={game}
                resources={this.state.trades[trade]}
                selectedTrade={selectedTrade}
                handleViewTrade={this.handleViewTrade}
                handleRejectTrade={this.handleRejectTrade}
                handleAcceptTrade={this.handleAcceptTrade}
              />
            ))}
          </div>
        </div>
        <div className="trade-chat">
          <Chat player={player} game={game} />
        </div>
      </div>
    );
  }
}

export default TradeView;
