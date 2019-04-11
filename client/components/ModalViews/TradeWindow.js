import React, { Fragment } from 'react';
import TradeResource from './TradeResource';
import TradeButton from './TradeButton';
import './TradeWindow.scss';

function TradeWindow({ type, val, handleClick, hidden, original }) {
  const add = val > 0 ? val : 0;
  const minus = val < 0 ? val : 0;
  const quantity = original + add + minus;
  const color =
    quantity > original ? 'green' : quantity < original ? 'red' : 'white';
  return (
    <div
      style={{ justifyContent: hidden ? 'center' : 'space-between' }}
      className="trade-window"
    >
      {!hidden && (
        <Fragment>
          <p style={{ color: 'var(--color-red)' }}>{minus * -1}</p>
          <TradeButton
            handleClick={() => {
              if (quantity) handleClick(type, -1);
            }}
            color="red"
            dir="up"
          />
        </Fragment>
      )}
      <TradeResource
        color={color}
        type={type}
        quantity={quantity}
        original={original}
      />
      {!hidden && (
        <Fragment>
          <TradeButton
            handleClick={() => handleClick(type, 1)}
            color="green"
            dir="down"
          />
          <p style={{ color: 'var(--color-green)' }}>{add}</p>
        </Fragment>
      )}
    </div>
  );
}

export default TradeWindow;
