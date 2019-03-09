import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../store/actions';
import { Build } from './ModalViews';
import './Modal.scss';

class Modal extends Component {
  renderModalView(view) {
    const { playerNumber } = this.props;
    switch (view) {
      case 'build':
        return <Build playerNumber={playerNumber} />;
      default:
        return <div />;
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

const mapStateToProps = ({ menu, player }) => ({
  modal: menu.modal,
  modalView: menu.modalView,
  playerNumber: player.playerNumber,
});

export default connect(
  mapStateToProps,
  { toggleModal }
)(Modal);
