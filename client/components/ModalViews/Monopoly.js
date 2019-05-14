import React, { Component } from 'react';
import socket from '../../socket';
import { ResourceView } from '../ResourceComponents';

class Monopoly extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(resource) {
    const { playerNumber, name } = this.props;
    this.props.reset();
    socket.emit('update', {
      resource,
      player: playerNumber,
      game: name,
      type: 'development',
      action: 'play-card',
      card: 'monopoly',
    });
  }

  render() {
    return (
      <div className="resource-btn-container">
        <h1>Select a resource</h1>
        <ResourceView hideNum handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Monopoly;
