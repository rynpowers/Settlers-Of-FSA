import React, { Component } from 'react';
import ResourceBtnList from './ResourceBtnList';
import ModalSubmit from './ModalSubmit';
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
    const { playerNumber, name } = this.props;
    socket.emit('play-card', {
      type: 'play-card',
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
    const total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v],
      0
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ResourceBtnList
          handleClick={this.handleClick}
          resources={this.state}
          color
          quantity
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ModalSubmit
            handleSubmit={this.handleClear}
            text="Clear"
            style={btnStyle}
          />
          {total === 2 && (
            <ModalSubmit
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
