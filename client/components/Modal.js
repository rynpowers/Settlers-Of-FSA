import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Build, CreateTrade, OfferTrade } from './ModalViews';
import './Modal.scss';

class Modal extends Component {
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'create-trade':
        return <CreateTrade {...this.props} />;
      case 'offer-trade':
        return <OfferTrade {...this.props} />;
      default:
    }
  }
  render() {
    const views = ['create-trade', 'build'];
    return (
      <div className={`modal ${this.props.modal && 'modal-active'}`}>
        {this.renderModalView(this.props.modalView)}
        {views.includes(this.props.modalView) && (
          <div
            onClick={() => this.props.toggleModal('')}
            className="modal-close"
          >
            <div />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ menu, player, game, localState }) => ({
  modal: menu.modal,
  modalView: menu.modalView,
  playerNumber: player.playerNumber,
  player,
  localState,
  game,
});

export default connect(
  mapStateToProps,
  {
    toggleModal: actions.toggleModal,
    updateMode: actions.updateMode,
    toggleExitMenu: actions.toggleExitMenu,
    updateOffer: actions.updateOffer,
  }
)(Modal);
