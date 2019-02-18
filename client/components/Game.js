import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBoardThunk } from '../store/actions';
import Board from './Board';
import socket from '../socket';
import { store } from '../store';
import './Game.scss';

class Game extends Component {
  componentDidMount() {
    socket.emit('join-game', this.props.game);
    socket.on('connect', () => socket.emit('join-game', this.props.game));
    socket.on('dispatch', action => store.dispatch(action));
  }

  render() {
    if (!this.props.board.resources) return <div>Loading...</div>;
    return (
      <div className="game-container">
        <Board />
      </div>
    );
  }
}

const mapStateToProps = ({ game, board }) => ({ game, board });

export default connect(
  mapStateToProps,
  { setBoardThunk }
)(Game);
