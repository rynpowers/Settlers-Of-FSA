import React, { Component } from 'react';
import Trade from './TradeModal/Trade';
import ModalSubmit from './ModalSubmit';

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

  handleClick(type, val) {
    let discard = Math.floor(this.props.totalResources / 2);
    let total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v] * -1,
      0
    );

    if ((val < 0 && total < discard) || (this.state[type] && val > 0)) {
      this.setState(prevState => ({
        [type]: prevState[type] + val,
      }));
    }
  }

  handleSubmit() {
    let discard = Math.floor(this.props.totalResources / 2);
    let total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v] * -1,
      0
    );

    if (total === discard) console.log('clicked submit');
  }

  render() {
    let discard = Math.floor(this.props.totalResources / 2);
    let total = Object.keys(this.state).reduce(
      (a, v) => a + this.state[v] * -1,
      0
    );

    let visibility = total === discard ? 'visible' : 'hidden';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          height: '50rem',
        }}
      >
        <ModalSubmit
          handleSubmit={this.handleSubmit}
          style={{ alignSelf: 'flex-end', visibility }}
          text="Submit"
        />
        <Trade
          player={this.props.player}
          handleClick={this.handleClick}
          resources={this.state}
          hidePlus={true}
        />
      </div>
    );
  }
}

export default Robber;
