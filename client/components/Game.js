import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBoardThunk } from '../store/actions';
import Board from './Board';
import { setupGameSockets } from '../socket';
import './Game.scss';

class Game extends Component {
  componentDidMount() {
    setupGameSockets(this.props);
  }

  render() {
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
