import React, { Component } from 'react';
import { ResourceView } from '../ResourceComponents';
import SubmitBtn from '../SubmitBtn';
import socket from '../../socket';

const btnStyle = {
  transform: 'scale(0.8)',
  marginLeft: '1rem',
};

const initialState = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

class YearOfPlenty extends Component {
  constructor() {
    super();

    this.state = { ...initialState };

    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('test');
    const { playerNumber, name } = this.props;
    socket.emit('update', {
      type: 'development',
      action: 'play-card',
      card: 'yearOfPlenty',
      game: name,
      player: playerNumber,
      resources: this.state,
    });
  }

  handleClear() {
    this.setState({ ...initialState });
  }

  handleClick(resource) {
    const total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v],
      0
    );
    if (total < 2) {
      this.setState(prev => ({ [resource]: prev[resource] + 1 }));
    }
  }

  render() {
    const { resources } = this.props;
    const total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v],
      0
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ResourceView
          handleClick={this.handleClick}
          updateResources={this.state}
          resources={resources}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SubmitBtn
            handleSubmit={this.handleClear}
            text="Clear"
            style={btnStyle}
          />
          {total === 2 && (
            <SubmitBtn
              handleSubmit={this.handleSubmit}
              text="Submit"
              style={btnStyle}
            />
          )}
        </div>
      </div>
    );
  }
}

export default YearOfPlenty;
