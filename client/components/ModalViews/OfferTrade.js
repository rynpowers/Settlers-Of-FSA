import React, { Component, Fragment } from 'react';
import Trade from './Trade';

export class OfferTrade extends Component {
  handleClick(type, val) {
    const { offer } = this.props.localState;
    this.props.updateOffer({ ...offer, [type]: offer[type] + val });
  }
  render() {
    return (
      <Fragment>
        <Trade
          resources={this.props.localState.offer}
          handleClick={(type, val) => this.handleClick(type, val)}
        />
      </Fragment>
    );
  }
}

export default OfferTrade;
