import React, { Fragment } from 'react';
import TradeWindow from './TradeWindow';

function CreateTrade({
  players,
  active,
  submitTradeOffer,
  resources,
  handleClick,
  handleClickActive,
}) {
  return (
    <Fragment>
      <div className="trade-partners">
        <div className="trade-partners-container">
          {players.map(player => (
            <div
              key={player}
              onClick={() => handleClickActive(player)}
              className={`btn-${player} ${active[player] && 'active'}`}
            >
              {player}
            </div>
          ))}
        </div>

        <button
          onClick={submitTradeOffer}
          type="submit"
          className="modal-submit"
        >
          Offer Trade
        </button>
      </div>
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
    </Fragment>
  );
}

export default CreateTrade;
