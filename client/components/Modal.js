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
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return this.props.playerNumber === this.props.game.playerTurn ? (
          <TradeView {...this.props} />
        ) : (
          <TradeViewOpponent {...this.props} />
        );
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
    const { game, playerNumber, updateMode } = this.props;
    const views = [
      'trade',
      'build',
      !game.responded[playerNumber] && 'robber',
      'dev',
      'monopoly',
      'yearOfPlenty',
      'roll',
    ];
    const modalActive = views.includes(game.mode);
    return (
      <div className={`modal ${modalActive && 'modal-active'}`}>
        {this.renderModalView(game.mode)}
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
  totalResources: Object.keys(player.resources).reduce(
    (a, v) => a + player.resources[v],
    0
  ),
  player,
  resources: player.resources,
  game,
  name: game.name,
});

export default connect(
  mapStateToProps,
  {
    updateMode: actions.updateMode,
    reset: actions.reset,
    toggleExitMenu: actions.toggleExitMenu,
  }
)(Modal);
