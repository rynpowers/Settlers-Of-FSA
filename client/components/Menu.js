import React, { Component, Fragment } from 'react';
import * as actions from '../store/actions';
import Exit from './Exit';
import { connect } from 'react-redux';
import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleMenuCLick = this.handleMenuCLick.bind(this);
  }

  handleMenuCLick(e) {
    let isParent = e.target.dataset.value !== undefined;
    let elem = isParent ? e.target : e.target.parentNode;
    this.props.updateMode(elem.dataset.value);
  }

  render() {
    const { exit, toggleMenu, toggleExitMenu, main, updateMode } = this.props;
    const menuClassList = `${main && 'active'} ${exit && 'exit-active'}`;

    return (
      <Fragment>
        <div
          onClick={() => (!exit ? toggleMenu() : toggleExitMenu())}
          className={`menu menu-main ${menuClassList}`}
        >
          <div className="menu-arrow" />
          {exit && <Exit handleClick={updateMode.bind(this, '')} show={exit} />}
        </div>
        <Exit handleClick={toggleMenu} show={main} />
        <div
          onClick={this.handleMenuCLick}
          className={`options ${main && 'expand'}`}
        >
          <div data-value="build" className="menu menu-option menu-option-1">
            <h3>Build</h3>
          </div>
          <div data-value="trade" className="menu menu-option menu-option-2">
            <h3>Trade</h3>
          </div>
          <div data-value="dev" className="menu menu-option menu-option-3">
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
  {
    toggleMenu: actions.toggleMenu,
    toggleExitMenu: actions.toggleExitMenu,
    updateMode: actions.updateMode,
  }
)(Menu);
