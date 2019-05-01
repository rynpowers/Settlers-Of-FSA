import React, { Component } from 'react';
import Trade from './TradeModal/Trade';
import ModalSubmit from './ModalSubmit';
import socket from '../../socket';

class Robber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: {
        forest: 0,
        hill: 0,
        pasture: 0,
        mountain: 0,
        field: 0,
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(type, val) {
    let discard = Math.floor(this.props.totalResources / 2);
    const { resources } = this.state;
    let total = Object.keys(this.state.resources).reduce(
      (a, v) => a + resources[v] * -1,
      0
    );

    if ((val < 0 && total < discard) || (resources[type] && val > 0)) {
      this.setState({
        resources: { ...resources, [type]: resources[type] + val },
      });
    }
  }

  handleSubmit() {
    const { resources } = this.state;
    const { player } = this.props;
    let updatedResources = Object.keys(resources).reduce((a, v) => {
      a[v] = player.resources[v] + resources[v];
      return a;
    }, {});

    const payload = {
      type: 'robber',
      game: this.props.game.name,
      playerNumber: player.playerNumber,
      resources: updatedResources,
    };

    socket.emit('robbing-player', payload);
  }

  render() {
    const { resources } = this.state;
    let discard = Math.floor(this.props.totalResources / 2);
    let total = Object.keys(resources).reduce(
      (a, v) => a + resources[v] * -1,
      0
    );

    let visibility = total === discard ? 'visible' : 'hidden';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          height: '50rem',
        }}
      >
        <ModalSubmit
          handleSubmit={this.handleSubmit}
          style={{ alignSelf: 'flex-end', visibility }}
          text="Submit"
        />
        <Trade
          player={this.props.player}
          handleClick={this.handleClick}
          resources={resources}
          hidePlus={true}
        />
      </div>
    );
  }
}

export default Robber;
