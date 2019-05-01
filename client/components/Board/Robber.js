import React from 'react';

const Robber = ({ board, id, hover }) => {
  const { hasRobber, diceValue } = board.resources[id];
  return hasRobber || hover ? (
    <div className="resource-image-robber" data-type="robber" data-id={id} />
  ) : (
    diceValue && (
      <div className="resource-image-number">
        <h3>{diceValue}</h3>
      </div>
    )
  );
};

export default Robber;
