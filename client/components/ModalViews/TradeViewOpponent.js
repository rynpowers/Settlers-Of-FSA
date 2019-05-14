import React, { Component, Fragment } from 'react';
import TradeOffer from './TradeOffer';
import { ResourceView } from '../ResourceComponents';
import TradeComponentWindow from './TradeComponentWindow';
import socket from '../../socket';
import SubmitBtn from '../SubmitBtn';

const defaultResources = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

export class TradeViewOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultResources };
    this.handleSendTrade = this.handleSendTrade.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(type, val) {
    const { resources } = this.props;
    const canDec = val < 0 && resources[type] + this.state[type];

    if (canDec || val > 0)
      this.setState(prev => ({ [type]: prev[type] + val }));
  }

  reversePerspective(resources) {
    return Object.keys(resources).reduce((a, v) => {
      a[v] = resources[v] ? resources[v] * -1 : 0;
      return a;
    }, {});
  }

  handleSendTrade() {
    const { name, playerNumber } = this.props;
    let resources = this.reversePerspective({ ...this.state });
    this.props.updateTrades(resources, playerNumber);
    socket.emit('update', {
      type: 'trade',
      action: 'add',
      player: playerNumber,
      game: name,
      resources,
    });
    this.setState({ ...defaultResources });
  }

  render() {
    const { resources, playerNumber, game, trades, player } = this.props;
    const offer = trades[playerNumber];

    return (
      <TradeComponentWindow
        game={game}
        player={player}
        renderComponentOne={() => (
          <Fragment>
            <ResourceView
              style={{ height: '25rem' }}
              updateResources={
                offer ? this.reversePerspective(offer) : this.state
              }
              handleClickInc={!offer && this.handleClick}
              handleClickDec={!offer && this.handleClick}
              resources={resources}
            />
            {!offer && (
              <SubmitBtn text="Submit" handleSubmit={this.handleSendTrade} />
            )}
          </Fragment>
        )}
        renderComponentTwo={() =>
          Object.keys(trades).map(trade => (
            <TradeOffer
              key={trade}
              trade={trade}
              game={game}
              resources={trades[trade]}
            />
          ))
        }
      />
    );
  }
}

export default TradeViewOpponent;
