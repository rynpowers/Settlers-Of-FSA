import React from 'react';
import './Button.scss';

const Button = ({ handleClick, style, type, text }) => {
  return (
    <button
      style={style}
      onClick={handleClick}
      type="submit"
      className={`btn btn-${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
