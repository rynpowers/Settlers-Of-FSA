import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
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

  handleMoveRobber(e) {
    const { mode, name } = this.props;
    const elem = e.target;
    const { type, id } = elem.dataset;

    if (type === 'robber' || type === 'resource')
      socket.emit('move-robber', { id, type: mode, game: name });
  }

  handleClick(e) {
    const { mode } = this.props;
    const elem = e.target;
    const { type, id } = elem.dataset;

    switch (mode) {
      case 'road':
        return type === 'road' && this.handleUpdate(type, id);
      case 'settlement':
        return type === 'settlement' && this.handleUpdate(type, id);
      case 'city':
        return type === 'settlement' && this.handleUpdate(type, id);
      case 'move-robber':
        return this.handleMoveRobber(e);
      default:
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
});

export default connect(
  mapStateToProps,
  {
    updateBoardThunk: actions.updateBoardThunk,
    reset: actions.reset,
  }
)(BoardController);
