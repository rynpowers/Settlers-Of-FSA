import React from 'react';
import ResourceExchange from './ResourceExchange';
import withResourceState from './withResourceState';

const defaultResources = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

export const ResourceView = ({
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
          key={type}
          type={type}
          diff={updateResources[type]}
          quantity={updateResources[type] + resources[type]}
          original={resources[type]}
          handleClickInc={
            handleClickInc && (() => handleClickInc(handleClick, type))
          }
          handleClickDec={
            handleClickDec && (() => handleClickDec(handleClick, type))
          }
          style={style}
        />
      ))}
    </div>
  );
};

export const ResourceExchangeComponent = withResourceState(ResourceView);
