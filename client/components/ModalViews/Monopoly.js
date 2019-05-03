import React, { Component } from 'react';
import './ResourceBtn.scss';
import socket from '../../socket';
import ResourceBtnList from './ResourceBtnList';

class Monopoly extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(resource) {
    const { playerNumber, name } = this.props;
    this.props.reset();
    socket.emit('play-card', {
      resource,
      player: playerNumber,
      game: name,
      type: 'play-card',
      card: 'monopoly',
    });
  }

  render() {
    const { player } = this.props;

    return (
      <div className="resource-btn-container">
        <h1>Select a resource</h1>
        <ResourceBtnList resources={player.resources} />
      </div>
    );
  }
}

export default Monopoly;
