import React from 'react';
import { ResourcePanel } from '../ResourceComponents';

function BuildViewBtn({ resources, playerNumber, type }) {
  return (
    <div className="modal-build-view">
      <div
        className={`modal-build-view-btn modal-build-view-btn-${playerNumber}`}
        data-value={type}
      >
        {type[0].toUpperCase() + type.slice(1)}
      </div>
      <ResourcePanel resources={resources} />
    </div>
  );
}

export default BuildViewBtn;
