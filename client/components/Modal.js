import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Build, TradeView } from './ModalViews';
import './Modal.scss';

class Modal extends Component {
  renderModalView(view) {
    console.log(view);
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return <TradeView {...this.props} />;
      case 'robber':
        return (
          <div>
            <h1>Robber</h1>
          </div>
        );
      default:
    }
  }

  render() {
    const views = ['trade', 'build', 'robber'];
    const modalActive = views.includes(this.props.game.mode);
    return (
      <div className={`modal ${modalActive && 'modal-active'}`}>
        {this.renderModalView(this.props.game.mode)}
        <div onClick={() => this.props.updateMode('')} className="modal-close">
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, player, game }) => ({
  modal: menu.modal,
  playerNumber: player.playerNumber,
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
