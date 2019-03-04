import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Board from './Board';

class BoardController extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { mode } = this.props;
    let { type, id } = e.target.dataset;
    if (type === mode) {
      type = type === 'city' ? 'settlement' : type;
      this.props.updateBoardThunk(id, type);
      this.props.reset();
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

const mapStateToProps = ({ localState }) => ({ mode: localState.mode });

export default connect(
  mapStateToProps,
  {
    updateBoardThunk: actions.updateBoardThunk,
    reset: actions.reset,
  }
)(BoardController);
