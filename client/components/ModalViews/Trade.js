import React from 'react';
import TradeWindow from './TradeWindow';

const Trade = ({ handleClick, resources }) => {
  return (
    <div className="trade-resources">
      {Object.keys(resources).map(type => (
        <TradeWindow
          key={type}
          type={type}
          val={resources[type]}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Trade;
