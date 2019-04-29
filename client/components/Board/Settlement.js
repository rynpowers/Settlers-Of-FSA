import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateSettlement, validateCity } from '../../validators';

class Settlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseOver() {
    const { mode, isTurn, id, pos, resources } = this.props;
    const settlementId = resources[id].settlements[pos];
    const validCity = validateCity(settlementId) && mode === 'city';
    const validSettlement =
      validateSettlement(settlementId) && mode === 'settlement';
    const valid =
      mode === 'city'
        ? validCity
        : mode === 'settlement'
        ? validSettlement
        : false;

    if (isTurn && valid) this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  handleClick(e) {
    const { mode, isTurn, id, pos, resources } = this.props;
    const settlementId = resources[id].settlements[pos];
    const validator = mode === 'city' ? validateCity : validateSettlement;
    const valid = validator(settlementId) && isTurn;
    if (!valid) e.stopPropagation();
  }

  render() {
    const { hover } = this.state;
    const { pos, id, playerNumber, resources, settlements, mode } = this.props;
    const settlementId = resources[id].settlements[pos];
    const settlement = settlements[settlementId];
    const { build, player } = settlement;
    const hoverMode = mode === 'settlement' || mode === 'city';

    return (
      <div
        className={`settlement settlement-${pos}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      >
        {
          <div className={`build-${hover && hoverMode ? build + 1 : build}`}>
            <div
              data-id={settlementId}
              data-type="settlement"
              className={`build-inner-${
                hover && hoverMode ? build + 1 : build
              } player-${hover && hoverMode ? playerNumber : player}`}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ board, player, game }) => ({
  resources: board.resources,
  settlements: board.settlements,
  playerNumber: player.playerNumber,
  isTurn: player.playerNumber === game.playerTurn,
  mode: game.mode,
});

export default connect(mapStateToProps)(Settlement);
