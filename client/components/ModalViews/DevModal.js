import React, { Component } from 'react';
import ModalSubmit from './ModalSubmit';
import Card from './Card';
import socket from '../../socket';
import './Card.scss';

class DevModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { playerNumber, name } = this.props;
    socket.emit('get-card', {
      player: playerNumber,
      game: name,
      type: 'get-card',
    });
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <div className="card-container">
          {Object.keys(player.devCards).reduce((a, card, i) => {
            const quantity = parseInt(player.devCards[card], 10);
            if (quantity)
              a.push(<Card key={`${i + 1}`} type={card} quantity={quantity} />);
            return a;
          }, [])}
        </div>
        <ModalSubmit handleSubmit={this.handleSubmit} text="Buy Card" />
      </div>
    );
  }
}

export default DevModal;
