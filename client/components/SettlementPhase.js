import React, { Component } from 'react';
import FlashAlert from './FlashAlert';
import { connect } from 'react-redux';
import socket from '../socket';

class SettlementPhase extends Component {
  render() {
    const { phase, phaseIndex, playerNumber, name, isTurn, mode } = this.props;
    return (
      isTurn &&
      !mode && (
        <FlashAlert
          message={
            phase[phaseIndex] === 'road' ? 'Build a road' : 'Build a settlement'
          }
          handleSubmit={() => {
            socket.emit('update', {
              type: 'settlement-phase',
              player: playerNumber,
              game: name,
            });
          }}
        />
      )
    );
  }
}

const mapStateToProps = ({
  game: {
    settlement: { complete, phase, phaseIndex },
    name,
    playerTurn,
    mode,
  },
  player: { playerNumber },
}) => ({
  complete,
  phase,
  phaseIndex,
  name,
  player: playerNumber,
  isTurn: playerTurn === playerNumber,
  mode,
});

export default connect(
  mapStateToProps,
  null
)(SettlementPhase);
