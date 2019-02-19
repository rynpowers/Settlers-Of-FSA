import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinGameThunk } from '../store/actions';
import Board from './Board';
import socket from '../socket';
import { store } from '../store';
import './Game.scss';

class Game extends Component {
  componentDidMount() {
    const board = this.props.board;
    const game = window.sessionStorage.getItem('game');
    const push = this.props.history.push.bind(this, '/');

    console.log('GAME:', game);

    if (!board.resources) this.props.joinGameThunk(game, null, push);

    socket.on('connect', () => this.props.joinGameThunk(game, null, push));
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
  { joinGameThunk }
)(Game);
