import React from 'react';
import TradeResource from './TradeResource';
import TradeButton from './TradeButton';
import './TradeWindow.scss';

function TradeWindow({ type, val, handleClick }) {
  const add = val > 0 ? val : 0;
  const minus = val < 0 ? val : 0;
  const quantity = 5 + add + minus;
  const original = 5;
  const color =
    quantity > original ? 'green' : quantity < original ? 'red' : 'white';
  return (
    <div className="trade-window">
      <p style={{ color: 'var(--color-red)' }}>{minus * -1}</p>
      <TradeButton
        handleClick={() => {
          if (quantity) handleClick(type, -1);
        }}
        color="red"
        dir="up"
      />
      <TradeResource
        color={color}
        type={type}
        quantity={quantity}
        original={original}
      />
      <TradeButton
        handleClick={() => handleClick(type, 1)}
        color="green"
        dir="down"
      />
      <p style={{ color: 'var(--color-green)' }}>{add}</p>
    </div>
  );
}

export default TradeWindow;
