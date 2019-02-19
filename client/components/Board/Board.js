import React from 'react';
import './index.scss';
import ResourceList from './ResourceList';
import options from './gameBoardOptions';

const Board = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="board-container">
      <div className="board-container-inner">
        <ResourceList
          num={3}
          options={options.row1}
          transform="translateY(60%)"
        />
        <ResourceList
          num={4}
          transform="translateY(30%)"
          options={options.row2}
        />
        <ResourceList num={5} options={options.row3} />
        <ResourceList
          num={4}
          options={options.row4}
          transform="translateY(-30%)"
        />
        <ResourceList
          num={3}
          options={options.row5}
          transform="translateY(-60%)"
        />
      </div>
    </div>
  );
};

export default Board;
