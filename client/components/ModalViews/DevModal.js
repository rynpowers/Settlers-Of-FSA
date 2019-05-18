import React, { Component, Fragment } from 'react';
import ModalClose from './ModalClose';
import DevCards from './DevCards';
import socket from '../../socket';
import './Card.scss';
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
      socket.emit('update', {
        player: playerNumber,
        action: 'play-card',
        type: 'development',
        game: name,
        card,
      });
    });
  }

  handleSubmit() {
    const { playerNumber, name } = this.props;
    if (this.canBuy()) {
      this.props.reset();
      socket.emit('update', {
        player: playerNumber,
        game: name,
        action: 'get-card',
        type: 'development',
      });
    } else {
      this.setState({ message: "You don't have sufficient resources" });
    }
  }

  combineCards() {
    const { devCards, purchased } = this.props;
    const cards = Object.keys(devCards).filter(card => devCards[card]);

    return cards.reduce((a, v) => {
      a[v] = devCards[v] + (purchased[v] || 0);
      return a;
    }, {});
  }

  render() {
    const { selectedCard } = this.state;
    const { devCardPlayed, devCards, purchased } = this.props;

    return (
      <Fragment>
        <ModalClose handleClick={this.props.updateMode} />
        <DevCards
          devCards={devCards}
          cantPlay={devCardPlayed ? this.combineCards() : purchased}
          devCardPlayed={devCardPlayed}
          handleSubmit={this.handleSubmit}
        />
        <div className={`card-modal ${selectedCard && 'card-modal-active'}`}>
          <ModalClose handleClick={() => this.setState({ selectedCard: '' })} />
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
      </Fragment>
    );
  }
}

export default DevModal;
