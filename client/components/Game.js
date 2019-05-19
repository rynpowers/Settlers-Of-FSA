import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinGameThunk } from '../store/actions';
import { BoardController } from './Board';
import Menu from './Menu';
import Modal from './Modal';
import FlashAlert from './FlashAlert';
import Player from './Player';
import socket from '../socket';
import { store } from '../store';
import './Game.scss';
import SettlementPhase from './SettlementPhase';
import { ResourcePanel } from './ResourceComponents';

class Game extends Component {
  componentDidMount() {
    const board = this.props.board;
    const game = window.sessionStorage.getItem('game');
    const push = this.props.history.push.bind(this, '/');

    if (!board.resources) this.props.joinGameThunk(game, null, push);

    socket.on('connect', () => this.props.joinGameThunk(game, null, push));
    socket.on('dispatch', action => store.dispatch(action));
  }

  render() {
    if (!this.props.board.resources) return <div>Loading...</div>;
    const { players, isTurn, game, flash, name, playerNumber } = this.props;
    return (
      <div className="game-container">
        <BoardController />
        <Menu />
        <Modal />
        <FlashAlert message={!game.playing && 'Wating for Players'} />
        {game.playing && !game.settlement.complete && <SettlementPhase />}
        <FlashAlert
          message={isTurn && flash}
          handleSubmit={() =>
            socket.emit('update', { type: 'flash', game: name })
          }
        />
        {Object.keys(players).map(i => (
          <Player
            key={i}
            id={i}
            player={players[i]}
            isTurn={game.playerTurn == i}
          />
        ))}
        <div className={`game-resources border-${playerNumber}`}>
          <ResourcePanel resources={this.props.resources} />
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
  isTurn: game.playerTurn === player.playerNumber,
  flash: game.flash,
  name: game.name,
  playerNumber: player.playerNumber,
  resources: player.resources,
});

export default connect(
  mapStateToProps,
  { joinGameThunk }
)(Game);
