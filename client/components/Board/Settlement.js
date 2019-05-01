import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  validateSettlement,
  validateCity,
  validateRob,
} from '../../validators';

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
    const { id, validator } = this.props;
    if (validator(id)) this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  handleClick(e) {
    const { id, validator } = this.props;
    if (!validator(id)) e.stopPropagation();
  }

  render() {
    const { hover } = this.state;
    const { pos, id, playerNumber, settlements, hoverMode, mode } = this.props;
    const settlement = settlements[id];
    const { build, player } = settlement;
    const buildHover = hover && hoverMode ? build + 1 : build;
    const playerClass = hover && hoverMode ? playerNumber : player;
    const robHover = validateRob(id) && 'rob-settlement';

    return (
      <div
        className={`settlement settlement-${pos}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      >
        {
          <div className={`build-${buildHover}`}>
            <div
              data-id={id}
              data-type="settlement"
              className={`build-inner-${buildHover} player-${playerClass} ${robHover}`}
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
  hoverMode: game.mode === 'city' || game.mode === 'settlement',
  validator:
    game.mode === 'city'
      ? validateCity
      : game.mode === 'settlement'
      ? validateSettlement
      : validateRob,
  robber: board.robber,
  mode: game.mode,
});

export default connect(mapStateToProps)(Settlement);
