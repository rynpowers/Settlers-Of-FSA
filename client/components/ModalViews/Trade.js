import React, { Component, Fragment } from 'react';
import './Trade.scss';
import TradeWindow from './TradeWindow';
import socket from '../../socket';

class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
      resources: {
        forest: 0,
        hill: 0,
        field: 0,
        mountain: 0,
        pasture: 0,
      },
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
    const { resources, active } = this.state;
    const trade = { ...resources };

    Object.keys(trade).forEach(key => {
      if (trade[key]) trade[key] *= -1;
    });

    socket.emit('tradeOffer', { trade, active });
  }

  handleClickActive(playerNumber) {
    this.setState(prevState => ({
      active: {
        ...prevState.active,
        [playerNumber]: !prevState.active[playerNumber],
      },
    }));
  }

  handleClick(type, val) {
    this.setState(prevState => {
      const { resources } = prevState;
      return { resources: { ...resources, [type]: resources[type] + val } };
    });
  }

  render() {
    const { active, resources } = this.state;
    const { game, playerNumber } = this.props;
    let players = Object.keys(game.players).filter(id => id != playerNumber);

    return (
      <Fragment>
        <div className="trade-partners">
          <div className="trade-partners-container">
            {players.map(playerNumber => (
              <div
                key={playerNumber}
                onClick={() => this.handleClickActive(playerNumber)}
                className={`btn-${playerNumber} ${active[playerNumber] &&
                  'active'}`}
              >
                {playerNumber}
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
        <div className="trade-resources">
          {Object.keys(resources).map(type => (
            <TradeWindow
              key={type}
              type={type}
              val={resources[type]}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Trade;
