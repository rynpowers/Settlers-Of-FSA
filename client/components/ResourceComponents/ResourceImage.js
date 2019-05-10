import React from 'react';
import './ResourceComponents.scss';

function ResourceImage({ type, quantity, original, handleClick, hideNum }) {
  const classString =
    original === undefined || original === quantity
      ? ''
      : original < quantity
      ? 'add'
      : 'minus';

  quantity = quantity < 0 ? quantity * -1 : quantity;

  return (
    <div
      onClick={handleClick}
      className={`resource-component-image ${type} ${handleClick &&
        'resource-btn'}`}
    >
      {!hideNum && <div className={classString}>{quantity}</div>}
    </div>
  );
}

export default ResourceImage;
