import React from 'react';
import './TradeResource.scss';

function TradeResource({ type, quantity }) {
  return (
    <div className={`trade-resource trade-resource-${type}`}>
      <div>{quantity}</div>
    </div>
  );
}

export default TradeResource;
