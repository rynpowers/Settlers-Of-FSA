import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Board from './Board';

class BoardController extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  isValidType(type) {
    console.log('checking type');
    const types = ['settlement', 'road'];
    return types.includes(type);
  }

  handleClick(e) {
    const { type, id } = e.target.dataset;
    console.log(e.target);
    if (this.isValidType(type)) this.props.updateBoardThunk(id, type);
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
  {
    updateBoardThunk: actions.updateBoardThunk,
  }
)(BoardController);
