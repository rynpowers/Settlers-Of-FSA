import React from 'react';

const Card = ({ type, quantity, handleClick }) => {
  return (
    <div className={`card card-${type}`} onClick={() => handleClick(type)}>
      <div className="card-quantity">
        <h2>{quantity}</h2>
      </div>
    </div>
  );
};

export default Card;
