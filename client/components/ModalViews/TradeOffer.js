import React from 'react';
import TradeResource from './TradeResource';
import './TradeOffer.scss';

function TradeOffer({ resources, player, selectedTrade, handleViewTrade }) {
  return (
    <div className="trade-offer">
      {Object.keys(resources).reduce((a, key) => {
        const num = resources[key];
        if (num !== 0)
          return [
            ...a,
            <TradeResource
              key={key}
              quantity={num < 0 ? num * -1 : num}
              type={key}
              color={num < 0 ? 'red' : 'green'}
            />,
          ];
        return a;
      }, [])}
      <div
        className="trade-offer-btns"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <button
          style={{ display: player === selectedTrade && 'none' }}
          onClick={() => handleViewTrade(player)}
          type="submit"
          className="trade-btn trade-submit"
        >
          View
        </button>
        <button
          style={{ display: player !== selectedTrade && 'none' }}
          type="submit"
          className="trade-btn trade-accept"
        >
          Accept
        </button>
        <button
          style={{ display: player !== selectedTrade && 'none' }}
          type="submit"
          className="trade-btn trade-reject"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default TradeOffer;
