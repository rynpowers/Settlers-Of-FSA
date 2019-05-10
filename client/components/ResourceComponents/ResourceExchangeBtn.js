import React from 'react';
import './ResourceComponents.scss';

function ResourceExchangeBtn({ inc, handleClick }) {
  return (
    <div
      className={`resource-component-btn ${inc ? 'inc' : 'dec'}`}
      onClick={handleClick}
    >
      <div />
    </div>
  );
}

export default ResourceExchangeBtn;
