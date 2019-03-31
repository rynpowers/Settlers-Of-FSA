import React from 'react';
import './Chat.scss';

function Message({ message, player, playerNumber, style }) {
  return (
    <div
      style={style}
      className={`box ${
        player === playerNumber ? `sb2-${player} box-player` : `sb1-${player}`
      } bubble-${player}`}
    >
      {message}
    </div>
  );
}

export default Message;
