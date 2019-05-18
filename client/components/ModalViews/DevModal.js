import React, { Component, Fragment } from 'react';
import Card from './Card';
import CardQuantity from './CardQuantity';
import { ResourcePanel } from '../ResourceComponents';
import ModalClose from './ModalClose';
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

  renderDevCardBtn() {
    const cost = options.cost.dev;
    return (
      <Card classes="card-active" key="button" handleClick={this.handleSubmit}>
        <h2>Buy Card</h2>
        <ResourcePanel resources={cost} />
      </Card>
    );
  }

  renderDevCards(cards) {
    return Object.keys(cards)
      .filter(card => cards[card])
      .map(card => (
        <Card
          key={card}
          classes={`card-${card} card-active`}
          handleClick={() => this.setState({ selectedCard: card })}
        >
          <CardQuantity quantity={cards[card]} />
        </Card>
      ));
  }

  combineCards() {
    const { devCards, purchased } = this.props;

    const cards = Object.keys(devCards).filter(card => devCards[card]);

    return cards.reduce((a, v) => {
      a[v] = devCards[v] + (purchased[v] || 0);
      return a;
    }, {});
  }

  renderPurchasedCards(cards) {
    return Object.keys(cards).map(card => (
      <Card key={card} classes={`card-${card}`}>
        <div className="card-cover">
          <h2>Play Next Turn</h2>
        </div>
        <CardQuantity quantity={cards[card]} />
      </Card>
    ));
  }

  render() {
    const { selectedCard } = this.state;
    const { devCardPlayed, devCards, purchased } = this.props;

    const cantPlay = devCardPlayed ? this.combineCards() : purchased;

    return (
      <Fragment>
        <ModalClose handleClick={this.props.updateMode} />
        <div className="card-container">
          {this.renderDevCardBtn()}
          {!devCardPlayed && this.renderDevCards(devCards)}
          {this.renderPurchasedCards(cantPlay)}
        </div>
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
