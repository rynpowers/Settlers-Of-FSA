import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import './Flash.scss';
import FlashAlert from './FlashAlert';

const next = {
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
    const { name } = this.props;
    socket.emit('update', { type: 'flash', game: name });
  }

  render() {
    return (
      <FlashAlert message={this.props.flash} handleSubmit={this.handleSubmit} />
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
