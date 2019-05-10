import React from 'react';
import './ResourceComponents.scss';

function ResourceImage({ type, quantity, original }) {
  const classString =
    original === undefined || original === quantity
      ? ''
      : original < quantity
      ? 'add'
      : 'minus';

  quantity = quantity < 0 ? quantity * -1 : quantity;

  return (
    <div className={`resource-component-image ${type}`}>
      {quantity !== undefined && <div className={classString}>{quantity}</div>}
    </div>
  );
}

export default ResourceImage;
