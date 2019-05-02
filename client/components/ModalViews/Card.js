import React from 'react';

const Card = ({ type, quantity }) => {
  return (
    <div className={`card card-${type}`}>
      <div className="card-quantity">
        <h2>{quantity}</h2>
      </div>
    </div>
  );
};

export default Card;
