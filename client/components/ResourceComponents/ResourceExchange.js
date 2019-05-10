import React, { Fragment } from 'react';
import ResourceExchangeBtn from './ResourceExchangeBtn';
import ResourceImage from './ResourceImage';

const ResourceExchange = ({
  hideNum,
  type,
  handleClickInc,
  handleClickDec,
  handleClick,
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
          <ResourceExchangeBtn inc handleClick={handleClickInc} />
        </Fragment>
      )}
      <ResourceImage
        hideNum={hideNum}
        type={type}
        quantity={quantity}
        original={original}
        handleClick={handleClick}
      />
      {handleClickDec && (
        <Fragment>
          <ResourceExchangeBtn handleClick={handleClickDec} />
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
