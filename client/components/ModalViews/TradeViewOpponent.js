import React, { Component } from 'react';
import TradeOffer from './TradeModal/TradeOffer';
import { ResourceExchangeComponent, ResourceView } from '../ResourceComponents';
import TradeComponentWindow from './TradeModal/TradeComponentWindow';
import socket from '../../socket';

export class TradeViewOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: {},
      loaded: false,
    };
    this.handleSendTrade = this.handleSendTrade.bind(this);
  }

  componentDidMount() {
    socket.emit('get', 'trades', this.props.game.name);
    socket.on('trades', ({ trades }) => {
      this.setState({
        trades,
        loaded: true,
      });
    });
  }

  componentWillUnmount() {
    socket.removeAllListeners('trades');
  }

  reversePerspective(resources) {
    return Object.keys(resources).reduce((a, v) => {
      a[v] = resources[v] ? resources[v] * -1 : 0;
      return a;
    }, {});
  }

  handleSendTrade(resources) {
    this.setState(prevState => ({
      trades: {
        ...prevState.trades,
        [this.props.playerNumber]: resources,
      },
      offered: true,
    }));

    resources = this.reversePerspective(resources);

    socket.emit('incoming-trade', {
      type: 'trade',
      action: 'add',
      player: this.props.player.playerNumber,
      game: this.props.game.name,
      resources,
    });
  }

  render() {
    const { trades } = this.state;
    const { player, playerNumber, game } = this.props;

    if (!this.state.loaded) return <div>loading...</div>;

    const offer = trades[playerNumber];
    console.log(offer);

    return (
      <TradeComponentWindow
        {...this.props}
        renderComponentOne={() =>
          offer ? (
            <ResourceView
              updateResources={this.reversePerspective(offer)}
              resources={player.resources}
            />
          ) : (
            <ResourceExchangeComponent
              style={{ height: '25rem' }}
              handleSubmit={this.handleSendTrade}
              handleClickInc={(fn, type) => fn(type, 1)}
              handleClickDec={(fn, type) => fn(type, -1)}
              resources={player.resources}
            />
          )
        }
        renderComponentTwo={() =>
          Object.keys(this.state.trades).map(trade => (
            <TradeOffer
              key={trade}
              trade={trade}
              player={player}
              game={game}
              resources={this.state.trades[trade]}
            />
          ))
        }
      />
    );
  }
}

export default TradeViewOpponent;
