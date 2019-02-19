import React, { Component } from 'react';
import { joinGameThunk } from '../store/actions';
import { connect } from 'react-redux';
import './Lobby.scss';

const game = 'newGame';

class Lobby extends Component {
  render() {
    const pushGame = this.props.history.push.bind(this, '/game');
    const pushHome = this.props.history.push.bind(this, '/');

    return (
      <div className="lobby-container">
        <div>
          <h1>Join Game</h1>
          <button
            type="submit"
            onClick={() => this.props.joinGameThunk(game, pushGame, pushHome)}
          >
            Join Game
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { joinGameThunk }
)(Lobby);
