import React from 'react';
import './Chat.scss';

function Chat({ message, player, playerNumber }) {
  return (
    <div
      className={`box ${
        player === playerNumber ? `sb2-${player} box-player` : `sb1-${player}`
      } bubble-${player}`}
    >
      {message}
    </div>
  );
}

export default Chat;
