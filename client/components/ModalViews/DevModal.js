import React, { Component } from 'react';
import Card from './Card';
import socket from '../../socket';
import './Card.scss';
import SubmitBtn from '../SubmitBtn';
import FlashAlert from '../FlashAlert';
import options from '../Board/gameBoardOptions';

class DevModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedCard: '',
      message: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlayCard = this.handlePlayCard.bind(this);
  }
  canBuy() {
    const { resources } = this.props;
    return Object.keys(options.cost.dev).every(
      type => resources[type] >= options.cost.dev[type]
    );
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
    if (this.canBuy()) {
      this.props.reset();
      socket.emit('get-card', {
        player: playerNumber,
        game: name,
        type: 'get-card',
      });
    } else {
      this.setState({ message: "You don't have sufficient resources" });
    }
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
        <SubmitBtn handleSubmit={this.handleSubmit} text="Buy Card" />
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
        <FlashAlert
          message={this.state.message}
          handleSubmit={() => this.setState({ message: '' })}
        />
      </div>
    );
  }
}

export default DevModal;
