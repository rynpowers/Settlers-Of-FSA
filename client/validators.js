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

// helper functions for longest Road, BFS end point search and DFS max road fn

const getPlayerNeighbors = (node, settlements, roads, player) =>
  settlements[node].roads.reduce((a, v) => {
    if (roads[v].player == player) {
      const [s1, s2] = v.split('-');
      s1 != settlements[node].id ? a.push(s1) : a.push(s2);
    }
    return a;
  }, []);

const getPlayerRoads = (node, settlements, roads, player) =>
  settlements[node].roads.filter(road => roads[road].player == player);

const isEndPoint = (node, neighbors, settlements, player) => {
  const curPlayer = settlements[node].player;
  const notPlayer = curPlayer && curPlayer !== player;

  return neighbors.length === 1 || neighbors.length === 3 || notPlayer;
};

const traverseRoad = (node, road) =>
  node == road.settlements[0] ? road.settlements[1] : road.settlements[0];

// BFS for all end points for connected roads

const getEndpoints = (node, settlements, roads, player) => {
  let visited = new Set();
  let queue = [node];
  let endPoints = [];
  let pointer = 0;

  while (queue[pointer]) {
    let cur = queue[pointer++];
    if (!visited.has(cur)) {
      visited.add(cur);
      let neighbors = getPlayerNeighbors(cur, settlements, roads, player);
      neighbors.forEach(
        neighbor => !visited.has(neighbor) && queue.push(neighbor)
      );
      isEndPoint(cur, neighbors, settlements, player) && endPoints.push(cur);
    }
  }
  return endPoints.length ? endPoints : [node];
};

// DFS search for longest road from an individual end point

const getMaxRoad = (start, settlements, roads, player) => {
  let max = -Infinity;

  const helper = (node, visited = new Set(), arr = []) => {
    const curPlayer = settlements[node].player;
    if (arr.length && curPlayer && curPlayer !== player) return;
    getPlayerRoads(node, settlements, roads, player).forEach(r => {
      if (!visited.has(r)) {
        arr.push(r);
        visited.add(r);
        helper(traverseRoad(node, roads[r]), visited, arr);
        max = Math.max(max, arr.length);
        arr.pop();
        visited.delete(r);
      }
    });
  };

  helper(start);
  return max;
};

// longest Road function

export const longestRoad = (start, settlements, roads, player) =>
  getEndpoints(start, settlements, roads, player)
    .map(n => getMaxRoad(n, settlements, roads, player))
    .reduce((a, v) => Math.max(a, v));

export const playerPorts = () => {
  const { board, player } = store.getState();
  const { ports, settlements } = board;
  return Object.keys(ports).reduce((a, v) => {
    a[v] = ports[v].some(
      port => settlements[port].player === player.playerNumber
    );
    return a;
  }, {});
};

export const validatePortTrade = (plus, minus) => {
  const ports = playerPorts();
  let queue = [minus];

  if (!Object.values(plus).some(v => v)) return false;

  Object.keys(plus).forEach(resource => {
    const diff = ports[resource] ? 2 : ports.wildcard ? 3 : 4;
    while (plus[resource]--) {
      let next = [];
      queue.forEach(a => {
        for (let i = 0; i < a.length; i++) {
          let arr = [...a];
          arr[i] += diff;
          next.push(arr);
        }
      });
      queue = next;
    }
  });
  return queue.some(arr => arr.every(item => item === 0));
};
