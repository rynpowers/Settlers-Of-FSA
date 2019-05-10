import React, { Component, Fragment } from 'react';
import { ResourceView } from '../../ResourceComponents';
import TradeComponentWindow from './TradeComponentWindow';
import TradeOffer from './TradeOffer';
import socket from '../../../socket';
import './TradeView.scss';

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrade: 0,
      trades: {},
      loaded: false,
    };
    this.handleViewTrade = this.handleViewTrade.bind(this);
    this.handleAcceptTrade = this.handleAcceptTrade.bind(this);
    this.handleRejectTrade = this.handleRejectTrade.bind(this);
  }

  componentDidMount() {
    socket.emit('updateGame', {
      type: 'game',
      game: this.props.game.name,
      payload: { mode: 'trade' },
    });
    socket.emit('get', 'trades', this.props.game.name);
    socket.on('trades', ({ trades }) =>
      this.setState({ trades, loaded: true })
    );
  }

  componentWillUnmount() {
    socket.removeAllListeners('trades');
    socket.emit('updateGame', {
      type: 'game',
      game: this.props.game.name,
      payload: { mode: '' },
    });
  }

  handleViewTrade(selectedTrade) {
    this.setState({ selectedTrade });
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

  render() {
    const { trades, selectedTrade } = this.state;
    const { player, isTurn } = this.props;

    if (!this.state.loaded) return <div>loading...</div>;

    return (
      <TradeComponentWindow
        {...this.props}
        renderComponentOne={() => (
          <Fragment>
            <div
              style={{ display: !this.state.selectedTrade && 'none' }}
              onClick={() => this.setState({ selectedTrade: 0 })}
              className="modal-close"
            >
              <div />
            </div>
            <ResourceView
              updateResources={trades[selectedTrade]}
              resources={player.resources}
            />
          </Fragment>
        )}
        renderComponentTwo={() =>
          Object.keys(this.state.trades).map(trade => (
            <TradeOffer
              key={trade}
              trade={trade}
              isTurn={isTurn}
              resources={this.state.trades[trade]}
              selectedTrade={selectedTrade}
              handleViewTrade={this.handleViewTrade}
              handleRejectTrade={this.handleRejectTrade}
              handleAcceptTrade={this.handleAcceptTrade}
            />
          ))
        }
      />
    );
  }
}

export default TradeView;
