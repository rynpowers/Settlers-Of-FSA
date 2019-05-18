import React, { Fragment } from 'react';

function MenuBtn({ value, index, isTurn, rolled }) {
  const cover = isTurn ? !rolled && (index === 0 || index === 1) : index !== 4;
  return (
    <Fragment>
      <div
        data-value={value}
        className={`menu menu-option menu-option-${index + 1}`}
      >
        <h3>{value[0].toUpperCase() + value.slice(1)}</h3>
      </div>
      {cover && <div className={`menu menu-cover menu-cover-${index + 1}`} />}
    </Fragment>
  );
}

export default MenuBtn;
