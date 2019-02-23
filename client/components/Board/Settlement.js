import React, { Fragment } from 'react';
import './Settlement.scss';

export const Settlement = ({ board, pos, id }) => {
  const { resources, settlements } = board;
  const settlementId = resources[id].settlements[pos];
  const { player, build } = settlements[settlementId];
  return (
    <div
      className={`settlement settlement-${pos} player-${player}`}
      data-id={settlementId}
      data-type="settlement"
    >
      {build === 1 && (
        <div className={`build-${build}`}>
          <div
            className={`build-inner-${build} player-${player}`}
            data-type="settlement"
            data-id={settlementId}
          />
        </div>
      )}
      {build === 2 && (
        <div className={`build-${build}`}>
          <div className={`build-inner-${build} player-${player}`} />
        </div>
      )}
    </div>
  );
};

export const fullSettlementRender = (id, board, resource) => {
  const { settlements } = resource;
  const settlementArr = Array(6).fill(null);
  return settlementArr.map((item, i) => (
    <Settlement key={settlements[i]} pos={i} board={board} id={id} />
  ));
};

export const renderSettlements = ({
  board,
  visible,
  visibleOdd,
  visibleTopLeft,
  visibleTopRight,
  visibleBottomLeft,
  visibleBottomRight,
  id,
}) => {
  return (
    <Fragment>
      {visible &&
        visibleOdd &&
        fullSettlementRender(id, board, board.resources[id])}
      {visible && !visibleOdd && (
        <Fragment>
          <Settlement pos={1} board={board} id={id} />
          <Settlement pos={4} board={board} id={id} />
        </Fragment>
      )}
      {visibleTopLeft && <Settlement pos={0} board={board} id={id} />}
      {visibleTopRight && <Settlement pos={2} board={board} id={id} />}
      {visibleBottomLeft && <Settlement pos={3} board={board} id={id} />}
      {visibleBottomRight && <Settlement pos={5} board={board} id={id} />}
    </Fragment>
  );
};

export default Settlement;
