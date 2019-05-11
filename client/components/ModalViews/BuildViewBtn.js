import React from 'react';
import { ResourceImage } from '../ResourceComponents';

function BuildViewBtn({ resources, playerNumber, type }) {
  return (
    <div className="modal-build-view">
      <div
        className={`modal-build-view-btn modal-build-view-btn-${playerNumber}`}
        data-value={type}
      >
        {type[0].toUpperCase() + type.slice(1)}
      </div>
      <div className="modal-build-view-resources">
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
    </div>
  );
}

export default BuildViewBtn;
