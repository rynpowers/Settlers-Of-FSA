import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../store/actions';
import './Modal.scss';

class Modal extends Component {
  render() {
    return (
      <div className={`modal ${this.props.modal && 'modal-active'}`}>
        <div onClick={() => this.props.toggleModal()} className="modal-close">
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu }) => ({ modal: menu.modal });

export default connect(
  mapStateToProps,
  { toggleModal }
)(Modal);
