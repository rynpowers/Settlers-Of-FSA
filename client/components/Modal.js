import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import {
  Build,
  TradeViewPlayer,
  TradeViewOpponent,
  TradeView,
  Robber,
  DevModal,
  Monopoly,
  YearOfPlenty,
  Bank,
} from './ModalViews';
import './Modal.scss';
import { playerPorts } from '../validators';

class Modal extends Component {
  renderTrading() {
    return this.props.isTurn ? (
      <TradeViewPlayer {...this.props} />
    ) : (
      <TradeViewOpponent {...this.props} />
    );
  }

  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return (
          <TradeView
            playerNumber={this.props.playerNumber}
            handleClick={this.props.updateMode}
          />
        );
      case 'trading':
        return this.renderTrading();
      case 'bank':
        return <Bank {...this.props} />;
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
    const { respond, mode, isTurn } = this.props;
    const views = ['trading', 'build', respond && 'robber', 'dev'];

    const playerView =
      ['monopoly', 'yearOfPlenty', 'trade', 'bank'].includes(mode) && isTurn;

    const modalActive = views.includes(mode) || playerView;

    return (
      <div className={`modal ${modalActive && 'modal-active'}`}>
        {modalActive && this.renderModalView(mode)}
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
  game,
  player,
  isTurn: game.playerTurn === player.playerNumber,
  resources: player.resources,
  devCards: Object.keys(player.devCards).reduce((a, v) => {
    if (v !== 'purchased') a[v] = player.devCards[v];
    return a;
  }, {}),
  purchased: player.devCards.purchased,
  mode: game.mode,
  name: game.name,
  trades: game.trades,
  respond: !game.responded[player.playerNumber],
  ports: playerPorts(),
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
