import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Build, TradeView, Robber } from './ModalViews';
import './Modal.scss';

class Modal extends Component {
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return <TradeView {...this.props} />;
      case 'robber':
        return <Robber {...this.props} />;
      default:
    }
  }

  render() {
    const { game, playerNumber, updateMode } = this.props;
    const views = ['trade', 'build', !game.responded[playerNumber] && 'robber'];
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
  game,
});

export default connect(
  mapStateToProps,
  {
    updateMode: actions.updateMode,
    toggleExitMenu: actions.toggleExitMenu,
  }
)(Modal);
