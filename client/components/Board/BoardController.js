import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { longestRoad } from '../../validators';
import Board from './Board';
import socket from '../../socket';

class BoardController extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate(type, id) {
    this.props.updateBoardThunk(id, type);
    this.props.reset();
  }

  handleUpdateRoad(type, id) {
    const { playerNumber, name } = this.props;
    const payload = {
      id,
      player: playerNumber,
      type,
      game: name,
    };
    this.props.updateRoadThunk(payload, this.props.reset);
  }

  handleMoveRobber(elem) {
    const { mode, name, playerNumber } = this.props;
    const { id } = elem.dataset;

    socket.emit('move-robber', {
      id,
      type: mode,
      game: name,
      player: playerNumber,
    });
  }

  handleRobSettlement(elem) {
    const { id } = elem.dataset;
    const { playerNumber, name } = this.props;
    socket.emit('rob-settlement', {
      type: 'rob-settlement',
      id,
      player: playerNumber,
      game: name,
    });
  }

  handleClick(e) {
    const { mode, isTurn } = this.props;
    if (isTurn) {
      const elem = e.target;
      const { type, id } = elem.dataset;

      switch (mode) {
        case 'road':
          return type === 'road' && this.handleUpdateRoad(type, id);
        case 'settlement':
          return type === 'settlement' && this.handleUpdate(type, id);
        case 'city':
          return type === 'settlement' && this.handleUpdate(type, id);
        case 'move-robber':
          return type === 'robber' && this.handleMoveRobber(elem);
        case 'rob-settlement':
          return (
            elem.classList.contains('rob-settlement') &&
            this.handleRobSettlement(elem)
          );
        default:
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Board handleClick={this.handleClick} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ game, player }) => ({
  mode: game.mode,
  name: game.name,
  isTurn: player.playerNumber === game.playerTurn,
  playerNumber: player.playerNumber,
});

export default connect(
  mapStateToProps,
  {
    updateBoardThunk: actions.updateBoardThunk,
    reset: actions.reset,
    updateRoadThunk: actions.updateRoadThunk,
  }
)(BoardController);
