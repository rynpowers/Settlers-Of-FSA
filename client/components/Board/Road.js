import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateRoad } from '../../validators';

class Road extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    const { mode, isTurn, id } = this.props;
    const isValid = mode === 'road' && isTurn && validateRoad(id);
    if (isValid) this.setState({ hover: true });
  }

  handleMouseOut() {
    const { mode, isTurn, id } = this.props;
    const isValid = mode === 'road' && isTurn && validateRoad(id);
    if (isValid) this.setState({ hover: false });
  }

  render() {
    const { id, playerNumber, board } = this.props;
    const { hover } = this.state;
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        data-id={id}
        data-type="road"
        className={`player-${board.roads[id].player} ${hover &&
          `player-${playerNumber}`}`}
      />
    );
  }
}

const mapStateToProps = ({ board, player, game }) => ({
  board,
  playerNumber: player.playerNumber,
  isTurn: player.playerNumber === game.playerTurn,
  mode: game.mode,
});

export default connect(mapStateToProps)(Road);
