import React, { Component } from 'react';
import './Lobby.scss';

class Lobby extends Component {
  render() {
    return (
      <div className="lobby-container">
        <div>
          <h1>Join Game</h1>
          <button>Join Game</button>
        </div>
      </div>
    );
  }
}

export default Lobby;
