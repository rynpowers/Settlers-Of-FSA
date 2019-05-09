import React from 'react';
import './Player.scss';

function Player({ id, isTurn, player }) {
  const {
    resources,
    longestRoad,
    largestArmy,
    devCards,
    victoryPoints,
  } = player;
  console.log('============');
  console.log(isTurn);
  console.log('============');
  const active = isTurn ? `player-stats-active player-stats-active-${id}` : '';
  return (
    <div className={`player-stats player-stats-${id} ${active}`}>
      <ul className="player-stats-list">
        <li className="player-stats-list-item">
          <p>Resources</p> <p>{resources}</p>
        </li>
        <li className="player-stats-list-item">
          <p>Longest Road</p> <p>{longestRoad}</p>
        </li>
        <li className="player-stats-list-item">
          <p>Larget Army</p> <p>{largestArmy}</p>
        </li>
        <li className="player-stats-list-item">
          <p>Dev Cards</p> <p>{devCards}</p>
        </li>
        <li className="player-stats-list-item">
          <p>Victory Points</p> <p>{victoryPoints}</p>
        </li>
      </ul>
    </div>
  );
}

export default Player;
