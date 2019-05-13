import React, { Component } from 'react';
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
    this.state = {
      resources: { ...defaultResources },
    };
    this.handleSendTrade = this.handleSendTrade.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(type, val) {
    const { resources } = this.props;
    const canDec = val < 0 && resources[type] + this.state.resources[type];

    if (canDec || val > 0)
      this.setState(prev => ({
        resources: { ...prev.resources, [type]: prev.resources[type] + val },
      }));
  }

  reversePerspective(resources) {
    return Object.keys(resources).reduce((a, v) => {
      a[v] = resources[v] ? resources[v] * -1 : 0;
      return a;
    }, {});
  }

  handleSendTrade() {
    let { resources } = this.state;
    resources = this.reversePerspective(resources);
    this.setState({ resources: { ...defaultResources } });

    socket.emit('update', {
      type: 'trade',
      action: 'add',
      player: this.props.player.playerNumber,
      game: this.props.game.name,
      resources,
    });
  }

  render() {
    const { player, playerNumber, game } = this.props;
    const offer = this.props.trades[playerNumber];

    return (
      <TradeComponentWindow
        {...this.props}
        renderComponentOne={() => (
          <div>
            <ResourceView
              style={{ height: '25rem' }}
              updateResources={
                offer ? this.reversePerspective(offer) : this.state.resources
              }
              handleClickInc={!offer && this.handleClick}
              handleClickDec={!offer && this.handleClick}
              resources={player.resources}
            />
            {!offer && (
              <SubmitBtn text="Submit" handleSubmit={this.handleSendTrade} />
            )}
          </div>
        )}
        renderComponentTwo={() =>
          Object.keys(this.props.trades).map(trade => (
            <TradeOffer
              key={trade}
              trade={trade}
              player={player}
              game={game}
              resources={this.props.trades[trade]}
            />
          ))
        }
      />
    );
  }
}

export default TradeViewOpponent;
