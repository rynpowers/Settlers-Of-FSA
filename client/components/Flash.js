import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import './Flash.scss';
import SubmitBtn from './SubmitBtn';
import { updateFlash } from '../store/actions';

const next = {
  acknowledgeMoveRobber: 'move-robber',
  acknowledgeRobSettlement: 'rob-settlement',
  dev: 'dev',
  roadBuilding: 'road',
  monopoly: 'monopoly',
};

class Flash extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { name, playerNumber, mode } = this.props;
    const modes = ['build'];

    if (!modes.includes(mode)) {
      socket.emit('flash', {
        mode: next[mode],
        type: 'flash',
        game: name,
        player: playerNumber,
      });
    } else {
      this.props.updateFlash('');
    }
  }

  render() {
    return (
      <div
        className={`flash-container ${this.props.flash &&
          'flash-container-active'}`}
      >
        <div className={`flash ${this.props.flash && 'flash-active'}`}>
          <h2>{this.props.flash}</h2>
          <SubmitBtn
            style={{ transform: 'scale(0.8)' }}
            text="OK"
            handleSubmit={this.handleSubmit}
          />
        </div>
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
  { updateFlash }
)(Flash);
