import React, { Component, Fragment } from 'react';
import { toggleMenu } from '../store/actions';
import { connect } from 'react-redux';
import './BoardMenu.scss';

class BoardMenu extends Component {
  render() {
    return (
      <Fragment>
        <div
          onClick={() => this.props.toggleMenu()}
          className={`menu menu-main ${this.props.menu && 'active'}`}
        >
          <div className="menu-arrow" />
        </div>
        <div
          onClick={() => this.props.toggleMenu()}
          className={`menu menu-close ${this.props.menu && 'visible active'}`}
        />
        <div className={`options ${this.props.menu && 'expand'}`}>
          <div className="menu menu-option menu-option-1">
            <h3>Build</h3>
          </div>
          <div className="menu menu-option menu-option-2">
            <h3>Trade</h3>
          </div>
          <div className="menu menu-option menu-option-3">
            <h3>Dev</h3>
            <h3>Cards</h3>
          </div>
          <div className="menu menu-option menu-option-4">
            <h3>Roll</h3>
          </div>
          <div className="menu menu-option menu-option-5">
            <h3>Exit</h3>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(
  mapStateToProps,
  { toggleMenu }
)(BoardMenu);
