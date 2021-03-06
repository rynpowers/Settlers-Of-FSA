import React from 'react';
import { ResourceImage } from '../ResourceComponents';
import './TradeOffer.scss';
import Button from '../Button';

function TradeOffer({
  resources,
  selectedTrade,
  handleViewTrade,
  handleTradeAction,
  isTurn,
  trade,
}) {
  return (
    <div className={`trade-offer border-${trade}`}>
      {Object.keys(resources)
        .filter(type => resources[type])
        .map(type => (
          <ResourceImage
            key={type}
            type={type}
            original={0}
            quantity={resources[type]}
          />
        ))}
      {isTurn && (
        <div className="trade-offer-btns">
          <Button
            text="View"
            handleClick={handleViewTrade}
            style={{ display: trade == selectedTrade && 'none' }}
            type="submit"
          />
          <Button
            text="Accept"
            style={{ display: trade != selectedTrade && 'none' }}
            type="accept"
            handleClick={() => handleTradeAction(trade, 'accept')}
          />
          <Button
            text="Reject"
            style={{ display: trade != selectedTrade && 'none' }}
            type="reject"
            handleClick={() => handleTradeAction(trade, 'reject')}
          />
        </div>
      )}
    </div>
  );
}

export default TradeOffer;
