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

const getSettlementNeighbors = (id, board) => {
  const { settlements, roads } = board;
  const settlement = settlements[id];

  const neighbors = [];

  settlement.roads.forEach(r => {
    roads[r].settlements.forEach(s => neighbors.push(s));
  });

  return neighbors
    .filter(settlementId => settlementId !== id)
    .map(s => settlements[s]);
};

export const validateCity = id => {
  const { board, player, game } = store.getState();
  const settlement = board.settlements[id];
  return (
    game.mode === 'city' &&
    settlement.build === 1 &&
    settlement.player === player.playerNumber
  );
};

export const validateSettlement = id => {
  const { board, player, game } = store.getState();
  const settlement = board.settlements[id];
  const roads = settlement.roads.map(r => board.roads[r]);
  const neighbors = getSettlementNeighbors(id, board);

  return (
    game.mode === 'settlement' &&
    neighbors.every(neighbor => neighbor.player === null) &&
    roads.some(r => r.player === player.playerNumber) &&
    settlement.build === 0
  );
};

export const validateRob = id => {
  const { board, player, game } = store.getState();
  const { robber, resources, settlements } = board;
  const resource = resources[robber];
  const settlement = settlements[id];
  const hasSettlement = resource && resource.settlements.includes(id);
  const canRob =
    settlement.build != 0 && settlement.player != player.playerNumber;

  return hasSettlement && canRob && game.mode === 'rob-settlement';
};

const getPlayerNeighbors = node => {
  let { board, player } = store.getState();
  let { settlements, roads } = board;
  node = settlements[node];
  return node.roads
    .filter(road => roads[road].player == player.playerNumber)
    .reduce((a, v) => {
      const [s1, s2] = v.split('-');
      s1 != node.id ? a.push(s1) : a.push(s2);
      return a;
    }, []);
};

const getPlayerRoads = node => {
  let { board, player } = store.getState();
  let { settlements, roads } = board;
  node = settlements[node];

  return node.roads.filter(road => roads[road].player == player.playerNumber);
};

const getEndpoints = node => {
  const { board, player } = store.getState();
  let visited = new Set();
  let queue = [node];
  let endPoints = [];
  let pointer = 0;

  while (queue[pointer]) {
    let cur = queue[pointer++];
    if (!visited.has(cur)) {
      visited.add(cur);
      let neighbors = getPlayerNeighbors(cur);
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) queue.push(neighbor);
      });

      const curPlayer = board.settlements[cur].player;
      const isPlayer = curPlayer && curPlayer !== player.playerNumber;

      if (neighbors.length === 1 || neighbors.length === 3 || isPlayer) {
        endPoints.push(cur);
      }
    }
  }
  return endPoints;
};

const getMaxRoad = start => {
  let max = -Infinity;
  const { player, board } = store.getState();
  const { settlements } = board;

  const helper = (node, visited = new Set(), arr = []) => {
    const curPlayer = settlements[node].player;
    if (arr.length && curPlayer && curPlayer !== player.playerNumber) return;
    getPlayerRoads(node).forEach(r => {
      if (!visited.has(r)) {
        arr.push(r);
        visited.add(r);
        const nodes = r.split('-');
        const n = nodes[0] === node ? nodes[1] : nodes[0];
        helper(n, visited, arr);
        max = Math.max(max, arr.length);
        arr.pop();
        visited.delete(r);
      }
    });
  };

  helper(start);
  return max;
};

export const longestRoad = road => {
  const { player, board } = store.getState();
  const { roads } = board;
  const start = road.split('-')[0];

  roads[road] = { ...roads[road], player: player.playerNumber };

  return getEndpoints(start)
    .map(n => getMaxRoad(n))
    .reduce((a, v) => Math.max(a, v));
};
