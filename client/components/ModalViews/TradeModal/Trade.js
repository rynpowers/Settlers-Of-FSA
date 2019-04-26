import React from 'react';
import TradeWindow from './TradeWindow';

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const initResources = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

const Trade = ({ handleClick, resources, hidden, player, hidePlus }) => {
  resources = resources || initResources;
  return (
    <div className="trade-resources" style={style}>
      {Object.keys(resources).map(type => (
        <TradeWindow
          key={type}
          type={type}
          hidden={hidden}
          hidePlus={hidePlus}
          val={resources[type]}
          original={player.resources[type]}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Trade;
