import React, { Component } from 'react';
import ModalSubmit from './ModalSubmit';
import Card from './Card';
import socket from '../../socket';
import './Card.scss';

class DevModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedCard: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlayCard = this.handlePlayCard.bind(this);
  }
  handlePlayCard() {
    const card = this.state.selectedCard;
    const { playerNumber, name } = this.props;
    this.setState({ selectedCard: '' }, () => {
      this.props.reset();
      socket.emit('play-card', {
        player: playerNumber,
        type: 'play-card',
        game: name,
        card,
      });
    });
  }

  handleSubmit() {
    const { playerNumber, name } = this.props;
    socket.emit('get-card', {
      player: playerNumber,
      game: name,
      type: 'get-card',
    });
  }

  handleClick(card) {
    this.setState({ selectedCard: card });
  }

  render() {
    const { player } = this.props;
    const { selectedCard } = this.state;
    return (
      <div>
        <div className="card-container">
          {Object.keys(player.devCards).reduce((a, card, i) => {
            const quantity = parseInt(player.devCards[card], 10);
            if (quantity)
              a.push(
                <Card
                  key={`${i + 1}`}
                  type={card}
                  quantity={quantity}
                  handleClick={this.handleClick}
                />
              );
            return a;
          }, [])}
        </div>
        <ModalSubmit handleSubmit={this.handleSubmit} text="Buy Card" />
        <div className={`card-modal ${selectedCard && 'card-active'}`}>
          <div
            onClick={() => this.setState({ selectedCard: '' })}
            className="modal-close"
          >
            <div />
          </div>
          <div className={`card-showcase card-${selectedCard}`}>
            {selectedCard !== 'victoryPoint' && (
              <div onClick={this.handlePlayCard}>
                <h1>Play Card</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DevModal;
