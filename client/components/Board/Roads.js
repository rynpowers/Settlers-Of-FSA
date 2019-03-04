import React, { Fragment } from 'react';

const Roads = ({ roads, board, hover, playerNumber }) => {
  return (
    <Fragment>
      <div className="road-container top">
        <div
          data-id={roads[0]}
          data-hover="road-0"
          data-type="road"
          className={`player-${board.roads[roads[0]].player} ${hover[
            'road-0'
          ] && `player-${playerNumber}`}`}
        />
        <div
          data-id={roads[1]}
          data-hover="road-1"
          data-type="road"
          className={`player-${board.roads[roads[1]].player} ${hover[
            'road-1'
          ] && `player-${playerNumber}`}`}
        />
      </div>
      <div className="road-container middle">
        <div
          data-id={roads[4]}
          data-hover="road-4"
          data-type="road"
          className={`player-${board.roads[roads[4]].player} ${hover[
            'road-4'
          ] && `player-${playerNumber}`}`}
        />
        <div
          data-id={roads[5]}
          data-hover="road-5"
          data-type="road"
          className={`player-${board.roads[roads[5]].player} ${hover[
            'road-5'
          ] && `player-${playerNumber}`}`}
        />
      </div>
      <div className="road-container bottom">
        <div
          data-id={roads[2]}
          data-hover="road-2"
          data-type="road"
          className={`player-${board.roads[roads[2]].player} ${hover[
            'road-2'
          ] && `player-${playerNumber}`}`}
        />
        <div
          data-id={roads[3]}
          data-hover="road-3"
          data-type="road"
          className={`player-${board.roads[roads[3]].player} ${hover[
            'road-3'
          ] && `player-${playerNumber}`}`}
        />
      </div>
    </Fragment>
  );
};

export default Roads;
