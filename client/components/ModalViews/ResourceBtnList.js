import React from 'react';
import ResourceBtn from './ResourceBtn';

function ResourceBtnList({ resources, handleClick, quantity, color }) {
  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(resources).map(type => (
        <ResourceBtn
          key={type}
          type={type}
          handleClick={() => handleClick(type)}
          quantity={quantity && resources[type]}
          color={color}
        />
      ))}
    </div>
  );
}

export default ResourceBtnList;
