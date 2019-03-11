import React, { Component, Fragment } from 'react';
import './CreateTrade.scss';
import Trade from './Trade';
import ModalSubmit from './ModalSubmit';
import socket from '../../socket';

class CreateTrade extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.submitTradeOffer = this.submitTradeOffer.bind(this);
  }

  isValidState(nextState) {
    return (
      Object.keys(nextState).some(key => nextState[key] < 0) &&
      Object.keys(nextState).some(key => nextState[key] > 0)
    );
  }

  submitTradeOffer() {
    const trade = { ...this.props.localState.offer };
    const { game, playerNumber } = this.props;

    Object.keys(trade).forEach(key => {
      if (trade[key]) trade[key] *= -1;
    });

    socket.emit('tradeOffer', { trade, playerNumber, game: game.name });
    this.props.updateModalView('responding');
  }

  handleClick(type, val) {
    const { offer } = this.props.localState;
    this.props.updateOffer({ ...offer, [type]: offer[type] + val });
  }

  render() {
    const { localState } = this.props;

    return (
      <Fragment>
        <div className="trade-partners">
          <ModalSubmit
            handleSubmit={this.submitTradeOffer}
            text="Offer Trade"
          />
        </div>
        <Trade
          original={this.props.player.resources}
          resources={localState.offer}
          handleClick={this.handleClick}
        />
      </Fragment>
    );
  }
}

export default CreateTrade;
