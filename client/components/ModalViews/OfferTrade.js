import React, { Component, Fragment } from 'react';
import Trade from './Trade';
import ModalSubmit from './ModalSubmit';
import socket from '../../socket';

export class OfferTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.props.localState.offer);
  }

  handleClick(type, val) {
    const { offer } = this.props.localState;
    this.props.updateOffer({ ...offer, [type]: offer[type] + val });
  }
  render() {
    const { offer } = this.props.localState;
    const { resources } = this.props.player;
    const disabled = Object.keys(resources)
      .map(type => resources[type] + offer[type])
      .every(item => item >= 0);

    console.log(disabled);

    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '60rem',
            marginBottom: '3rem',
          }}
        >
          <ModalSubmit text="Reject Trade" handleSubmit={this.handleSubmit} />

          {disabled && (
            <ModalSubmit
              text={!this.state.counter ? 'Accept Trade' : 'Send Offer'}
              handleSubmit={this.handleSubmit}
            />
          )}

          {!this.state.counter && (
            <ModalSubmit
              text="Counter Offer"
              handleSubmit={() => this.setState({ counter: true })}
            />
          )}
        </div>
        <Trade
          hidden={!this.state.counter}
          original={this.props.player.resources}
          resources={this.props.localState.offer}
          handleClick={(type, val) => this.handleClick(type, val)}
        />
      </Fragment>
    );
  }
}

export default OfferTrade;
