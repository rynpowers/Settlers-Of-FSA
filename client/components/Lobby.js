import React, { Component } from 'react';
import { joinGameThunk } from '../store/actions';
import { connect } from 'react-redux';
import './Lobby.scss';

const game = 'newGame';

class Lobby extends Component {
  render() {
    const push = this.props.history.push.bind(this, '/game');
    return (
      <div className="lobby-container">
        <div>
          <h1>Join Game</h1>
          <button
            type="submit"
            onClick={() => this.props.joinGameThunk(game, push)}
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
