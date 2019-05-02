import React, { Component } from 'react';
import { ModalSubmit } from './ModalViews';
import { connect } from 'react-redux';
import socket from '../socket';
import './Flash.scss';

const next = {
  acknowledgeMoveRobber: 'move-robber',
  acknowledgeRobSettlement: 'rob-settlement',
  dev: 'dev',
  roadBuilding: 'road',
};

class Flash extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { name, playerNumber, mode } = this.props;
    socket.emit('flash', {
      mode: next[mode],
      type: 'flash',
      game: name,
      player: playerNumber,
    });
  }

  render() {
    return (
      <div className={`flash ${this.props.flash && 'flash-active'}`}>
        <h2>{this.props.flash}</h2>
        <ModalSubmit
          style={{ transform: 'scale(0.8)' }}
          text="OK"
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ game, player }) => ({
  flash: game.flash,
  name: game.name,
  mode: game.mode,
  playerNumber: player.playerNumber,
});

export default connect(
  mapStateToProps,
  null
)(Flash);
