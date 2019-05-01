import React, { Fragment } from 'react';
import Settlement from './Settlement';
import './Settlement.scss';

const Settlements = ({
  id,
  settlements,
  visible,
  visibleOdd,
  visibleTopLeft,
  visibleTopRight,
  visibleBottomLeft,
  visibleBottomRight,
}) => {
  return (
    <Fragment>
      {visible &&
        visibleOdd &&
        Array(6)
          .fill(null)
          .map((item, i) => (
            <Settlement key={settlements[i]} pos={i} id={settlements[i]} />
          ))}
      {visible && !visibleOdd && (
        <Fragment>
          <Settlement pos={1} id={settlements[1]} />
          <Settlement pos={4} id={settlements[4]} />
        </Fragment>
      )}
      {visibleTopLeft && <Settlement pos={0} id={settlements[0]} />}
      {visibleTopRight && <Settlement pos={2} id={settlements[2]} />}
      {visibleBottomLeft && <Settlement pos={3} id={settlements[3]} />}
      {visibleBottomRight && (
        <Settlement pos={5} id={settlements[5]} resourceId={id} />
      )}
    </Fragment>
  );
};

export default Settlements;
