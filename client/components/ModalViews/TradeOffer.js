import React from 'react';
import TradeResource from './TradeResource';
import './TradeOffer.scss';

function TradeOffer({
  resources,
  selectedTrade,
  handleViewTrade,
  handleAcceptTrade,
  handleRejectTrade,
  player,
  trade,
  game,
}) {
  return (
    <div className={`trade-offer border-${trade}`}>
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
      {game.playerTurn == player.playerNumber && (
        <div
          className="trade-offer-btns"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <button
            style={{ display: trade == selectedTrade && 'none' }}
            onClick={() => handleViewTrade(trade)}
            type="submit"
            className="trade-btn trade-submit"
          >
            View
          </button>
          <button
            style={{ display: trade != selectedTrade && 'none' }}
            type="submit"
            className="trade-btn trade-accept"
            onClick={() => handleAcceptTrade(trade)}
          >
            Accept
          </button>
          <button
            style={{ display: trade != selectedTrade && 'none' }}
            type="submit"
            className="trade-btn trade-reject"
            onClick={() => handleRejectTrade(trade)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default TradeOffer;
