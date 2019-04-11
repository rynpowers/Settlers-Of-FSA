import React, { Component, Fragment } from 'react';
import * as actions from '../store/actions';
import Exit from './Exit';
import MenuBtn from './MenuBtn';
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
    let mode = elem.dataset.value;
    this.props.updateMode(mode);
  }

  render() {
    const { exit, toggleMenu, toggleExitMenu, main, updateMode } = this.props;
    const menuClassList = `${main && 'active'} ${exit && 'exit-active'}`;
    const btns = ['build', 'trade', 'dev', 'roll', 'exit'];

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
          {btns.map((value, i) => (
            <MenuBtn key={value} value={value} index={i} />
          ))}
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
