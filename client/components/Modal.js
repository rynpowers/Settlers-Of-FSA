import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Build, TradeView } from './ModalViews';
import './Modal.scss';

class Modal extends Component {
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return <TradeView {...this.props} />;
      default:
    }
  }

  render() {
    return (
      <div className={`modal ${this.props.modal && 'modal-active'}`}>
        {this.renderModalView(this.props.modalView)}
        <div onClick={() => this.props.toggleModal('')} className="modal-close">
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, player, game }) => ({
  modal: menu.modal,
  modalView: menu.modalView,
  playerNumber: player.playerNumber,
  player,
  game,
});

export default connect(
  mapStateToProps,
  {
    toggleModal: actions.toggleModal,
    updateModalView: actions.updateModalView,
    updateMode: actions.updateMode,
    toggleExitMenu: actions.toggleExitMenu,
    updateOffer: actions.updateOffer,
  }
)(Modal);
