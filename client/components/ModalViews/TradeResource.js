import React from 'react';
import './TradeResource.scss';

function TradeResource({ type, quantity, color }) {
  return (
    <div className={`trade-resource trade-resource-${type}`}>
      <div style={{ color: `var(--color-${color})` }}>{quantity}</div>
    </div>
  );
}

export default TradeResource;
