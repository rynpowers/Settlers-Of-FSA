import React, { Component } from 'react';
import { ResourceView } from '../ResourceComponents';
import SubmitBtn from '../SubmitBtn';
import socket from '../../socket';

class Robber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forest: 0,
      hill: 0,
      pasture: 0,
      mountain: 0,
      field: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getTotal() {
    return Object.keys(this.state).reduce((a, v) => a + this.state[v] * -1, 0);
  }

  handleClick(type, val) {
    const { resources, discard } = this.props;
    const total = this.getTotal();
    const canDec =
      resources[type] + this.state[type] && total < discard && val < 0;
    const canInc = this.state[type] && val > 0;

    if (canDec || canInc)
      this.setState(prev => ({ ...prev, [type]: prev[type] + val }));
  }

  handleSubmit() {
    const { name, playerNumber, resources } = this.props;
    let updatedResources = Object.keys(this.state).reduce((a, v) => {
      a[v] = resources[v] + this.state[v];
      return a;
    }, {});

    socket.emit('update', {
      type: 'robber',
      action: 'discard',
      game: name,
      playerNumber: playerNumber,
      resources: updatedResources,
    });
  }

  render() {
    const { discard, resources } = this.props;
    let total = this.getTotal();

    return (
      <div>
        <ResourceView
          style={{ height: '25rem' }}
          updateResources={this.state}
          handleClickInc={this.handleClick}
          handleClickDec={this.handleClick}
          resources={resources}
        />
        <SubmitBtn
          text="Submit"
          handleSubmit={this.handleSubmit}
          style={{ visibility: total === discard ? 'visible' : 'hidden' }}
        />
      </div>
    );
  }
}

export default Robber;
