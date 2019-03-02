import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinGameThunk } from '../store/actions';
import { BoardController } from './Board';
import BoardMenu from './BoardMenu';
import Modal from './Modal';
import Player from './Player';
import socket from '../socket';
import { store } from '../store';
import './Game.scss';

const btnContainerStyles = {
  display: 'flex',
  width: '50%',
  justifyContent: 'space-evenly',
};

const btnStyles = {
  width: '4rem',
  height: '2rem',
  cursor: 'pointer',
};

class Game extends Component {
  componentDidMount() {
    const board = this.props.board;
    const game = window.sessionStorage.getItem('game');
    const push = this.props.history.push.bind(this, '/');

    if (!board.resources) this.props.joinGameThunk(game, null, push);

    socket.on('connect', () => this.props.joinGameThunk(game, null, push));
    socket.on('dispatch', action => {
      store.dispatch(action);
      if (action.type !== 'SET_PLAYER') {
        socket.emit('updatePlayer', game, this.props.player.playerNumber);
      }
    });
  }

  render() {
    if (!this.props.board.resources) return <div>Loading...</div>;
    const { players, player } = this.props;
    return (
      <div className="game-container">
        <BoardController />
        <BoardMenu />
        <Modal />
        {Object.keys(players).map(i => (
          <Player
            key={i}
            id={i}
            player={players[i]}
            isTurn={player.playerTurn === i}
          />
        ))}
        <div
          style={btnContainerStyles}
          onClick={e => {
            const diceValue = e.target.dataset.value;
            const { name } = this.props.game;
            socket.emit('updateGame', {
              type: 'diceValue',
              diceValue,
              game: name,
            });
          }}
        >
          <button style={btnStyles} type="submit" data-value={2}>
            2
          </button>
          <button style={btnStyles} type="submit" data-value={3}>
            3
          </button>
          <button style={btnStyles} type="submit" data-value={4}>
            4
          </button>
          <button style={btnStyles} type="submit" data-value={5}>
            5
          </button>
          <button style={btnStyles} type="submit" data-value={6}>
            6
          </button>
          <button style={btnStyles} type="submit" data-value={7}>
            7
          </button>
          <button style={btnStyles} type="submit" data-value={8}>
            8
          </button>
          <button style={btnStyles} type="submit" data-value={9}>
            9
          </button>
          <button style={btnStyles} type="submit" data-value={10}>
            10
          </button>
          <button style={btnStyles} type="submit" data-value={11}>
            11
          </button>
          <button style={btnStyles} type="submit" data-value={12}>
            12
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, board, player }) => ({
  game,
  players: game.players,
  board,
  player,
});

export default connect(
  mapStateToProps,
  { joinGameThunk }
)(Game);
