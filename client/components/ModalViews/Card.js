import React from 'react';

const Card = ({ type, classes, handleClick, children, quantity }) => {
  return (
    <div className={`card ${classes}`} onClick={() => handleClick(type)}>
      {quantity && (
        <div className="card-quantity">
          <h2>{quantity}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
