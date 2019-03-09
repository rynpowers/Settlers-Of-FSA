import React from 'react';
import './TradeButton.scss';

function TradeButton({ color, dir }) {
  const rotate = dir === 'up' ? '90deg' : dir === 'down' ? '-90deg' : '0deg';
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`trade-button ${color}`}
    >
      <div />
    </div>
  );
}

export default TradeButton;
