import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Board from './Board';

class BoardController extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClickSettlement(elem) {
    const { type, id } = elem.dataset;
    const { mode } = this.props;

    if (mode === 'settlement' || mode === 'city') {
      this.props.updateBoardThunk(id, type);
      this.props.reset();
    }
  }

  handleClickRoad(elem) {
    const { type, id } = elem.dataset;
    const { mode } = this.props;

    if (mode === 'road') {
      this.props.updateBoardThunk(id, type);
      this.props.reset();
    }
  }

  handleClick(e) {
    const elem = e.target;
    switch (elem.dataset.type) {
      case 'road':
        return this.handleClickRoad(elem);
      case 'settlement':
        return this.handleClickSettlement(elem);
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

const mapStateToProps = ({ game }) => ({ mode: game.mode });

export default connect(
  mapStateToProps,
  {
    updateBoardThunk: actions.updateBoardThunk,
    reset: actions.reset,
  }
)(BoardController);
