import React, { Fragment } from 'react';
import Settlement from './Settlement';
import './Settlement.scss';

export const fullSettlementRender = ({ id, resource }) => {
  const { settlements } = resource;
  const settlementArr = Array(6).fill(null);
  return settlementArr.map((item, i) => (
    <Settlement key={settlements[i]} pos={i} id={id} />
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
  id,
}) => {
  return (
    <Fragment>
      {visible &&
        visibleOdd &&
        fullSettlementRender({
          id,
          resource: board.resources[id],
        })}
      {visible && !visibleOdd && (
        <Fragment>
          <Settlement pos={1} id={id} />
          <Settlement pos={4} id={id} />
        </Fragment>
      )}
      {visibleTopLeft && <Settlement pos={0} id={id} />}
      {visibleTopRight && <Settlement pos={2} id={id} />}
      {visibleBottomLeft && <Settlement pos={3} id={id} />}
      {visibleBottomRight && <Settlement pos={5} id={id} />}
    </Fragment>
  );
};

export default Settlements;
