import React from 'react';
import ResourceImage from './ResourceImage';

function ResourcePanel({ resources }) {
  return (
    <div className="resource-component-panel">
      {Object.keys(resources).map(resource => (
        <ResourceImage
          key={resource}
          classes="small"
          type={resource}
          quantity={resources[resource]}
          original={resources[resource]}
        />
      ))}
    </div>
  );
}

export default ResourcePanel;
