import React from 'react';
import './Chat.scss';

function Chat({ message, player, playerNumber, style }) {
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

export default Chat;
