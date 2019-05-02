import React from 'react';

const ResourceBtn = ({ type, handleClick }) => {
  return (
    <div
      className={`trade-resource trade-resource-${type} resource-btn`}
      onClick={handleClick}
    />
  );
};

export default ResourceBtn;
