import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { store } from '../store';
import { setBoardThunk } from '../store/actions';
import Resource from './Resource';
import './Game.scss';

class Game extends Component {
  componentDidMount() {
    socket.on('connect', () => socket.emit('join-game', this.props.game));
    socket.on('dispatch', action => store.dispatch(action));
  }

  render() {
    return (
      <div className="game-container">
        <Resource />
      </div>
    );
  }
}

const mapStateToProps = ({ game, board }) => ({ game, board });

export default connect(
  mapStateToProps,
  { setBoardThunk }
)(Game);
