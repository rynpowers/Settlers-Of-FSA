import React, { Component, Fragment } from 'react';
import './CreateTrade.scss';
import Trade from './Trade';
import socket from '../../socket';

class CreateTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [false, false, false, false, false],
    };

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
    const { active } = this.state;
    const trade = { ...this.props.localState.offer };
    const { name } = this.props.game;

    Object.keys(trade).forEach(key => {
      if (trade[key]) trade[key] *= -1;
    });

    socket.emit('tradeOffer', { trade, active, game: name });
  }

  handleClickActive(playerNumber) {
    this.setState(prevState => ({
      active: prevState.active.map((item, i) =>
        i == playerNumber ? !prevState.active[playerNumber] : item
      ),
    }));
  }

  handleClick(type, val) {
    const { offer } = this.props.localState;
    this.props.updateOffer({ ...offer, [type]: offer[type] + val });
  }

  render() {
    const { active } = this.state;
    const { game, playerNumber, localState } = this.props;
    let players = Object.keys(game.players).filter(id => id != playerNumber);

    return (
      <Fragment>
        <div className="trade-partners">
          <div className="trade-partners-container">
            {players.map(player => (
              <div
                key={player}
                onClick={() => this.handleClickActive(player)}
                className={`btn-${player} ${active[player] && 'active'}`}
              >
                {player}
              </div>
            ))}
          </div>

          <button
            onClick={this.submitTradeOffer}
            type="submit"
            className="modal-submit"
          >
            Offer Trade
          </button>
        </div>
        <Trade resources={localState.offer} handleClick={this.handleClick} />
      </Fragment>
    );
  }
}

export default CreateTrade;
