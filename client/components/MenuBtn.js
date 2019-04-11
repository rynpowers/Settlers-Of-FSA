import React from 'react';

function MenuBtn({ value, index }) {
  return (
    <div
      data-value={`${value}`}
      className={`menu menu-option menu-option-${index + 1}`}
    >
      <h3>{value[0].toUpperCase() + value.slice(1)}</h3>
    </div>
  );
}

export default MenuBtn;
