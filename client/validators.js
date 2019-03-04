import { store } from './store';

const isConnectedRoad = (s1, s2, id) => {
  const { player, board } = store.getState();
  const { playerNumber } = player;

  let roads = [];

  if (s1.player === null || s1.player === playerNumber) roads = s1.roads;
  if (s2.player === null || s2.player === playerNumber)
    roads = [...roads, ...s2.roads];

  roads = roads.filter(road => road !== id);

  return roads.some(road => board.roads[road].player === player.playerNumber);
};

export const validateRoad = id => {
  const { player, board } = store.getState();
  const { playerNumber } = player;
  const { roads, settlements } = board;
  const road = roads[id];
  const s1 = settlements[road.settlements[0]];
  const s2 = settlements[road.settlements[1]];

  return (
    road.player === null &&
    (isConnectedRoad(s1, s2, id) ||
      s1.player === playerNumber ||
      s2.player === playerNumber)
  );
};
