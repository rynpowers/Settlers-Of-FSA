import React, { Fragment } from 'react';

const createClassList = (pos, settlement) => {
  const { build, player } = settlement;
  return `settlement settlement-${pos} player-${player} build-${build}`;
};

export const Settlement = ({ board, pos, id }) => {
  const { resources, settlements } = board;
  const settlementId = resources[id].settlements[pos];
  const settlement = settlements[settlementId];
  return (
    <div
      className={createClassList(pos, settlement)}
      data-id={settlementId}
      data-type="settlement"
    />
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
