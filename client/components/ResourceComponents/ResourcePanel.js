import React from 'react';
import ResourceExchange from './ResourceExchange';
import withResourceState from './withResourceState';

const ResourcePanel = ({ resources, stateResources, handleClick, style }) => {
  return (
    <div className="resource-component-panel">
      {Object.keys(resources).map(type => (
        <ResourceExchange
          key={type}
          type={type}
          diff={stateResources[type]}
          quantity={stateResources[type] + resources[type]}
          original={resources[type]}
          handleClickInc={() => handleClick(type, 1)}
          handleClickDec={() =>
            stateResources[type] + resources[type] > 0 && handleClick(type, -1)
          }
          style={style}
        />
      ))}
    </div>
  );
};

export default withResourceState(ResourcePanel);
