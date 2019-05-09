import React from 'react';
import './ResourceComponents.scss';

function ResourceBtn({ inc, handleClick }) {
  return (
    <div
      className={`resource-component-btn ${inc ? 'inc' : 'dec'}`}
      onClick={handleClick}
    >
      <div />
    </div>
  );
}

export default ResourceBtn;
