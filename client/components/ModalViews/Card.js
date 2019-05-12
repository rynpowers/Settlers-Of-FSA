import React from 'react';

const Card = ({ type, classes, handleClick, children }) => {
  return (
    <div className={`card ${classes}`} onClick={() => handleClick(type)}>
      {children}
    </div>
  );
};

export default Card;
