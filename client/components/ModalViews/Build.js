import React, { Component } from 'react';
import BuildViewBtn from './BuildViewBtn';
import './Build.scss';

const resourceCost = {
  road: { forest: 1, hill: 1 },
  settlement: { hill: 1, forest: 1, field: 1, pasture: 1 },
  city: { field: 2, mountain: 3 },
};

class Build extends Component {
  canBuy(cost) {
    const { resources } = this.props;
    return Object.keys(cost).every(type => resources[type] >= cost[type]);
  }

  render() {
    const { playerNumber } = this.props;
    return (
      <div
        className="modal-build"
        onClick={e => {
          const cost = resourceCost[e.target.dataset.value];
          const canBuy = this.canBuy(cost) && e.target.dataset.value;
          if (canBuy) {
            this.props.updateMode(e.target.dataset.value);
            this.props.toggleExitMenu();
          } else {
            this.props.updateFlash("you don't have sufficient resources");
          }
        }}
      >
        {['road', 'settlement', 'city'].map(type => (
          <BuildViewBtn
            key={type}
            resources={resourceCost[type]}
            type={type}
            playerNumber={playerNumber}
          />
        ))}
      </div>
    );
  }
}

export default Build;
