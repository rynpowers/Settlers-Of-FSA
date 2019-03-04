import React, { Component, Fragment } from 'react';
import {
  toggleMenu,
  toggleModal,
  toggleExitMenu,
  updateMode,
} from '../store/actions';
import Exit from './Exit';
import { connect } from 'react-redux';
import './Menu.scss';

class Menu extends Component {
  render() {
    return (
      <Fragment>
        <div
          onClick={() => {
            if (!this.props.exit) {
              this.props.toggleMenu();
            } else {
              this.props.toggleExitMenu();
            }
          }}
          className={`menu menu-main ${this.props.main && 'active'} ${this.props
            .exit && 'exit-active'}`}
        >
          <div className="menu-arrow" />
          {this.props.exit && (
            <Exit
              handleClick={this.props.updateMode.bind(this, '')}
              show={this.props.exit}
            />
          )}
        </div>
        <Exit handleClick={this.props.toggleMenu} show={this.props.main} />
        <div
          onClick={e => {
            let isParent = e.target.dataset.value !== undefined;
            let elem = isParent ? e.target : e.target.parentNode;
            this.props.toggleModal(elem.dataset.value);
          }}
          className={`options ${this.props.main && 'expand'}`}
        >
          <div data-value="build" className="menu menu-option menu-option-1">
            <h3>Build</h3>
          </div>
          <div data-value="trade" className="menu menu-option menu-option-2">
            <h3>Trade</h3>
          </div>
          <div
            data-value="development"
            className="menu menu-option menu-option-3"
          >
            <h3>Dev</h3>
            <h3>Cards</h3>
          </div>
          <div data-value="roll" className="menu menu-option menu-option-4">
            <h3>Roll</h3>
          </div>
          <div data-value="exit" className="menu menu-option menu-option-5">
            <h3>Exit</h3>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ menu }) => ({
  main: menu.main,
  modal: menu.modal,
  exit: menu.exit,
});

export default connect(
  mapStateToProps,
  { toggleMenu, toggleModal, toggleExitMenu, updateMode }
)(Menu);
