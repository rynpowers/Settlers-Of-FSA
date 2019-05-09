import React, { Fragment } from 'react';
import ResourceBtn from './ResourceBtn';
import ResourceImage from './ResourceImage';

const ResourceExchange = ({
  type,
  handleClickInc,
  handleClickDec,
  quantity,
  original,
  style,
  diff,
}) => {
  return (
    <div style={style} className="resource-component-exchange">
      {handleClickInc && (
        <Fragment>
          <div
            className="resource-component-exchange-num"
            style={{ color: 'var(--color-green)' }}
          >
            {diff > 0 ? diff : 0}
          </div>
          <ResourceBtn inc handleClick={handleClickInc} />
        </Fragment>
      )}
      <ResourceImage type={type} quantity={quantity} original={original} />
      {handleClickDec && (
        <Fragment>
          <ResourceBtn handleClick={handleClickDec} />
          <div
            className="resource-component-exchange-num"
            style={{ color: 'var(--color-red)' }}
          >
            {diff < 0 ? diff * -1 : 0}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ResourceExchange;
