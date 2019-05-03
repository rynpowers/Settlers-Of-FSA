import React from 'react';

const ResourceBtn = ({ type, handleClick, color, quantity }) => {
  color = quantity ? 'green' : 'white';
  return (
    <div
      className={`trade-resource trade-resource-${type} resource-btn`}
      onClick={handleClick}
    >
      {color && quantity !== undefined && (
        <div style={{ color: `var(--color-${color})` }}>{quantity}</div>
      )}
    </div>
  );
};

export default ResourceBtn;
