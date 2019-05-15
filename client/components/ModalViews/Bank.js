import React, { Component, Fragment } from 'react';
import ModalClose from './ModalClose';
import BankLabel from './BankLabel';
import { ResourceView } from '../ResourceComponents';
import { validatePortTrade } from '../../validators';
import SubmitBtn from '../SubmitBtn';
import socket from '../../socket';

const initialState = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateTrade() {
    const plus = Object.keys(this.state).reduce((a, v) => {
      if (this.state[v] > 0) a[v] = this.state[v];
      return a;
    }, {});

    const minus = Object.values(this.state).filter(v => v < 0);

    return validatePortTrade(plus, minus);
  }

  handleSubmit() {
    const { name, playerNumber } = this.props;
    socket.emit('update', {
      type: 'trade',
      action: 'bank',
      game: name,
      player: playerNumber,
      resources: this.state,
    });
  }

  handleClick(type, val) {
    const { resources } = this.props;
    if ((val < 0 && resources[type] + this.state[type]) || val > 0) {
      this.setState(prev => ({ [type]: prev[type] + val }));
    }
  }

  render() {
    const { updateMode, resources, ports } = this.props;
    return (
      <Fragment>
        <ModalClose handleClick={() => updateMode('trade')} />
        <SubmitBtn
          style={{
            visibility: this.validateTrade() ? 'visible' : 'hidden',
            marginBottom: '2rem',
            marginRight: '5rem',
            alignSelf: 'flex-end',
          }}
          text="Submit"
          handleSubmit={this.handleSubmit}
        />
        <BankLabel resources={resources} ports={ports} />
        <ResourceView
          style={{ height: '25rem' }}
          updateResources={this.state}
          resources={resources}
          handleClickInc={this.handleClick}
          handleClickDec={this.handleClick}
        />
      </Fragment>
    );
  }
}

export default Bank;
