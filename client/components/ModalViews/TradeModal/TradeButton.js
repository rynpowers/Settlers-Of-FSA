import React from 'react';
import './TradeButton.scss';

function TradeButton({ color, dir, handleClick }) {
  const rotate = dir === 'up' ? '90deg' : dir === 'down' ? '-90deg' : '0deg';
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`trade-button ${color}`}
      onClick={handleClick}
    >
      <div />
    </div>
  );
}

export default TradeButton;
