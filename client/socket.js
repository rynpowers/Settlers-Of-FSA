import io from 'socket.io-client';

console.log('setting up client socket');

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

export default socket;
