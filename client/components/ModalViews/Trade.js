import React, { Component } from 'react';
import TradeWindow from './TradeWindow';

class Trade extends Component {
  render() {
    const types = ['forest', 'hill', 'field', 'mountain', 'pasture'];
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '60rem',
        }}
      >
        {types.map(type => (
          <TradeWindow key={type} type={type} />
        ))}
      </div>
    );
  }
}

export default Trade;
