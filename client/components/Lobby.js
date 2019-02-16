import React, { Component } from 'react';
import { joinGameThunk } from '../store/actions';
import { connect } from 'react-redux';
import './Lobby.scss';

class Lobby extends Component {
  render() {
    return (
      <div className="lobby-container">
        <div>
          <h1>Join Game</h1>
          <button
            onClick={() =>
              this.props.joinGameThunk(
                'game',
                this.props.history.push.bind(this, '/game')
              )
            }
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
