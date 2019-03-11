import React from 'react';
import TradeWindow from './TradeWindow';

const Trade = ({ handleClick, resources, hidden, original }) => {
  console.log(original);
  return (
    <div className="trade-resources">
      {Object.keys(resources).map(type => (
        <TradeWindow
          key={type}
          type={type}
          hidden={hidden}
          val={resources[type]}
          original={original[type]}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Trade;
