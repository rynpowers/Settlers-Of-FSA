import React, { Component, Fragment } from 'react';
import {
  toggleMenu,
  toggleModal,
  toggleExitMenu,
  updateMode,
} from '../store/actions';
import socket from '../socket';
import Exit from './Exit';
import { connect } from 'react-redux';
import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleMenuCLick = this.handleMenuCLick.bind(this);
  }

  toggle(menu, cb) {
    this.props.toggleModal(menu);
    if (cb) cb();
  }

  handleMenuCLick(e) {
    let isParent = e.target.dataset.value !== undefined;
    let elem = isParent ? e.target : e.target.parentNode;
    let menu = elem.dataset.value;

    switch (menu) {
      case 'trade':
        return this.toggle(menu, () =>
          socket.emit('updateGame', {
            type: 'game',
            game: this.props.game.name,
            payload: { mode: 'trade' },
          })
        );
      default:
        return this.props.toggleModal(menu);
    }
  }
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
          onClick={this.handleMenuCLick}
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

const mapStateToProps = ({ menu, game }) => ({
  main: menu.main,
  modal: menu.modal,
  exit: menu.exit,
  game,
});

export default connect(
  mapStateToProps,
  { toggleMenu, toggleModal, toggleExitMenu, updateMode }
)(Menu);
