import React from 'react';

function Exit({ handleClick, show }) {
  return (
    <div
      onClick={handleClick}
      className={`menu menu-close ${show && 'visible active'}`}
    >
      <div />
    </div>
  );
}

export default Exit;
