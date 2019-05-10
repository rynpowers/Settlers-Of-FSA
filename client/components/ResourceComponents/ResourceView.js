import React from 'react';
import ResourceExchange from './ResourceExchange';

const defaultResources = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

const ResourceView = ({
  hideNum,
  resources,
  updateResources,
  handleClickInc,
  handleClickDec,
  handleClick,
  style,
}) => {
  updateResources = updateResources || defaultResources;
  resources = resources || defaultResources;
  return (
    <div className="resource-component-panel">
      {Object.keys(resources).map(type => (
        <ResourceExchange
          hideNum={hideNum}
          key={type}
          type={type}
          diff={updateResources[type]}
          quantity={updateResources[type] + resources[type]}
          original={resources[type]}
          handleClickInc={handleClickInc && (() => handleClickInc(type, 1))}
          handleClickDec={handleClickDec && (() => handleClickDec(type, -1))}
          handleClick={handleClick && (() => handleClick(type))}
          style={style}
        />
      ))}
    </div>
  );
};

export default ResourceView;
