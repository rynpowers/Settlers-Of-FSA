import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import {
  Build,
  TradeView,
  Robber,
  DevModal,
  Monopoly,
  YearOfPlenty,
} from './ModalViews';
import './Modal.scss';
import TradeViewOpponent from './ModalViews/TradeViewOpponent';

class Modal extends Component {
  renderTrade() {
    return this.props.playerNumber === this.props.playerTurn ? (
      <TradeView {...this.props} />
    ) : (
      <TradeViewOpponent {...this.props} />
    );
  }
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return this.renderTrade();
      case 'robber':
        return <Robber {...this.props} />;
      case 'dev':
        return <DevModal {...this.props} />;
      case 'monopoly':
        return <Monopoly {...this.props} />;
      case 'yearOfPlenty':
        return <YearOfPlenty {...this.props} />;
      default:
    }
  }

  render() {
    const { updateMode, respond, mode, isTurn } = this.props;
    const views = ['trade', 'build', respond && 'robber', 'dev'];

    const playerView = ['monopoly', 'yearOfPlenty'].includes(mode) && isTurn;

    const modalActive = views.includes(mode) || playerView;

    return (
      <div className={`modal ${modalActive && 'modal-active'}`}>
        {this.renderModalView(mode)}
        <div onClick={() => updateMode('')} className="modal-close">
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, player, game }) => ({
  modal: menu.modal,
  playerNumber: player.playerNumber,
  discard: Math.floor(
    Object.keys(player.resources).reduce((a, v) => a + player.resources[v], 0) /
      2
  ),
  player,
  isTurn: game.playerTurn === player.playerNumber,
  resources: player.resources,
  devCards: player.devCards,
  mode: game.mode,
  name: game.name,
  trades: game.trades,
  respond: !game.responded[player.playerNumber],
});

export default connect(
  mapStateToProps,
  {
    updateMode: actions.updateMode,
    reset: actions.reset,
    toggleExitMenu: actions.toggleExitMenu,
    updateTrades: actions.updateTrades,
  }
)(Modal);
