import React from 'react';
import ResourceList from './ResourceList';
import options from './gameBoardOptions';

const Board = () => {
  return (
    <div
      className="board-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
  );
};

export default Board;
