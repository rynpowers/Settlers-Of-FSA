import React from 'react';
import TradeWindow from './TradeWindow';

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'space-evenly',
};

const Trade = ({ handleClick, resources, hidden, player }) => {
  return (
    <div className="trade-resources" style={style}>
      {Object.keys(resources).map(type => (
        <TradeWindow
          key={type}
          type={type}
          hidden={hidden}
          val={resources[type]}
          original={player.resources[type]}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Trade;
