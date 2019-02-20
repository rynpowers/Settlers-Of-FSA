import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Board from './Board';

class BoardController extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClickRoad(elem) {
    console.log('clicked');
    this.props.updateRoadsThunk(elem.dataset.road);
  }

  handleClickSettlement(elem) {
    console.log(elem);
  }

  handleClick(e) {
    const { type } = e.target.dataset;
    switch (type) {
      case 'road':
        return this.handleClickRoad(e.target);
      case 'settlement':
        return this.handleClickSettlement(e.target);
      default:
    }
  }

  render() {
    return (
      <Fragment>
        <Board handleClick={this.handleClick} />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { updateRoadsThunk: actions.updateRoadsThunk }
)(BoardController);
