import React from 'react';
import TradeResource from './TradeResource';
import TradeButton from './TradeButton';
import './TradeWindow.scss';

function TradeWindow({ type }) {
  return (
    <div className="trade-window">
      <p style={{ color: 'var(--color-red)' }}>5</p>
      <TradeButton color="red" dir="up" />
      <TradeResource type={type} quantity={5} />
      <TradeButton color="green" dir="down" />
      <p style={{ color: 'var(--color-green)' }}>5</p>
    </div>
  );
}

export default TradeWindow;
