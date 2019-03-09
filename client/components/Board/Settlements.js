import React, { Fragment } from 'react';
import './Settlement.scss';

const Settlement = ({ board, pos, playerNumber, id, hover }) => {
  const { resources, settlements } = board;
  const settlementId = resources[id].settlements[pos];
  const settlement = settlements[settlementId];
  const { build, player } = settlement;

  return (
    <div className={`settlement settlement-${pos}`}>
      <div className={`build-${hover ? build + 1 : build}`}>
        <div
          data-id={settlementId}
          data-type="settlement"
          data-hover={`settlement-${pos}`}
          className={`build-inner-${hover ? build + 1 : build} player-${
            hover ? playerNumber : player
          }`}
        />
      </div>
    </div>
  );
};

export const fullSettlementRender = ({
  id,
  board,
  playerNumber,
  resource,
  hover,
}) => {
  const { settlements } = resource;
  const settlementArr = Array(6).fill(null);
  return settlementArr.map((item, i) => (
    <Settlement
      key={settlements[i]}
      playerNumber={playerNumber}
      pos={i}
      board={board}
      id={id}
      hover={hover[`settlement-${i}`]}
    />
  ));
};

const Settlements = ({
  board,
  visible,
  visibleOdd,
  visibleTopLeft,
  visibleTopRight,
  visibleBottomLeft,
  visibleBottomRight,
  player,
  id,
  hover,
}) => {
  return (
    <Fragment>
      {visible &&
        visibleOdd &&
        fullSettlementRender({
          id,
          board,
          playerNumber: player.playerNumber,
          resource: board.resources[id],
          hover,
        })}
      {visible && !visibleOdd && (
        <Fragment>
          <Settlement
            playerNumber={player.playerNumber}
            pos={1}
            board={board}
            id={id}
            hover={hover[`settlement-${1}`]}
          />
          <Settlement
            playerNumber={player.playerNumber}
            pos={4}
            board={board}
            id={id}
            hover={hover[`settlement-${4}`]}
          />
        </Fragment>
      )}
      {visibleTopLeft && (
        <Settlement
          playerNumber={player.playerNumber}
          pos={0}
          board={board}
          id={id}
          hover={hover[`settlement-${0}`]}
        />
      )}
      {visibleTopRight && (
        <Settlement
          playerNumber={player.playerNumber}
          pos={2}
          board={board}
          id={id}
          hover={hover[`settlement-${2}`]}
        />
      )}
      {visibleBottomLeft && (
        <Settlement
          playerNumber={player.playerNumber}
          pos={3}
          board={board}
          id={id}
          hover={hover[`settlement-${3}`]}
        />
      )}
      {visibleBottomRight && (
        <Settlement
          playerNumber={player.playerNumber}
          pos={5}
          board={board}
          id={id}
          hover={hover[`settlement-${5}`]}
        />
      )}
    </Fragment>
  );
};

export default Settlements;
