import io from 'socket.io-client';
import { store } from './store';
const socket = io(window.location.origin);

export const setupGameSockets = props => {
  socket.on('connect', () => {
    console.log('joining game:', props.game);
    socket.emit('join-game', props.game);
  });
  socket.on('dispatch', action => store.dispatch(action));
};

export default socket;
