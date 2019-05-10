import React from 'react';
import { ResourceView } from '../../ResourceComponents';
import './TradeOffer.scss';
import Button from '../../Button';

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
      <ResourceView updateResources={resources} />
      {game.playerTurn == player.playerNumber && (
        <div className="trade-offer-btns">
          <Button
            text="View"
            handleClick={() => handleViewTrade(trade)}
            style={{ display: trade == selectedTrade && 'none' }}
            type="submit"
          />
          <Button
            text="Accept"
            style={{ display: trade != selectedTrade && 'none' }}
            type="accept"
            handleClick={() => handleAcceptTrade(trade)}
          />
          <Button
            text="Reject"
            style={{ display: trade != selectedTrade && 'none' }}
            type="reject"
            handleClick={() => handleRejectTrade(trade)}
          />
        </div>
      )}
    </div>
  );
}

export default TradeOffer;
