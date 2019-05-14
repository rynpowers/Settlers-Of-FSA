import React, { Component, Fragment } from 'react';
import TradeViewPlayer from './TradeViewPlayer';
import ModalClose from './ModalClose';

export default class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedComponent: 0 };
  }

  renderSelection() {
    return (
      <div style={{ display: 'flex' }}>
        <div
          onClick={() => this.setState({ selectedComponent: 1 })}
          className={`modal-build-view modal-build-view-btn modal-build-view-btn-${
            this.props.playerNumber
          }`}
        >
          Players
        </div>
        <div
          onClick={() => this.setState({ selectedComponent: 2 })}
          className={`modal-build-view modal-build-view-btn modal-build-view-btn-${
            this.props.playerNumber
          }`}
        >
          Bank
        </div>
      </div>
    );
  }

  renderTrade() {
    return this.state.selectedComponent === 1 ? (
      <Fragment>
        <ModalClose
          handleClick={() => this.setState({ selectedComponent: 0 })}
        />
        <TradeViewPlayer {...this.props} />
      </Fragment>
    ) : (
      <Fragment>
        <ModalClose
          handleClick={() => this.setState({ selectedComponent: 0 })}
        />
        <h1>Bank</h1>
      </Fragment>
    );
  }

  render() {
    return (
      <>
        {this.state.selectedComponent
          ? this.renderTrade()
          : this.renderSelection()}
      </>
    );
  }
}
