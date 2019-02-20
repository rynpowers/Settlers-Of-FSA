import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinGameThunk } from '../store/actions';
import { BoardController } from './Board';
import socket from '../socket';
import { store } from '../store';
import './Game.scss';

class Game extends Component {
  componentDidMount() {
    const board = this.props.board;
    const game = window.sessionStorage.getItem('game');
    const push = this.props.history.push.bind(this, '/');

    if (!board.resources) this.props.joinGameThunk(game, null, push);

    socket.on('connect', () => this.props.joinGameThunk(game, null, push));
    socket.on('dispatch', action => {
      console.log('recieving update');
      store.dispatch(action);
    });
  }

  render() {
    if (!this.props.board.resources) return <div>Loading...</div>;
    return (
      <div className="game-container">
        <BoardController />
      </div>
    );
  }
}

const mapStateToProps = ({ game, board }) => ({ game, board });

export default connect(
  mapStateToProps,
  { joinGameThunk }
)(Game);
