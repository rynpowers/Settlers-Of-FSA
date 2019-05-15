import React from 'react';
import './BankLabel.scss';

function BankLabel({ resources, ports }) {
  return (
    <div className="bank-label-container">
      {Object.keys(resources).map(resource => (
        <div key={resource}>
          <div>
            <h1>{ports[resource] ? '2:1' : ports.wildcard ? '3:1' : '4:1'}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BankLabel;
