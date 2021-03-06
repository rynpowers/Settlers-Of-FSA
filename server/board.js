module.exports = () => {
  const board = {
    resources: {},
    settlements: {},
    roads: {},
    ports: {
      mountain: [3, 4],
      hill: [51, 50],
      forest: [40, 39],
      field: [8, 9],
      pasture: [16, 26],
      wildcard: [37, 47, 54, 53, 28, 17, 6, 7],
    },
  };

  const diceValue = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

  const resources = [
    'forest',
    'forest',
    'forest',
    'forest',
    'hill',
    'hill',
    'hill',
    'mountain',
    'mountain',
    'mountain',
    'pasture',
    'pasture',
    'pasture',
    'pasture',
    'field',
    'field',
    'field',
    'field',
    'desert',
  ];

  const createSettlements = (t, b) => {
    const arr = [t, t + 1, t + 2, b, b + 1, b + 2];
    arr.forEach(item => {
      board.settlements[item] = {
        id: item,
        player: null,
        roads: [],
        build: 0,
        neighbors: [],
      };
    });
    return arr;
  };
  const createRoads = (t, b) => {
    const arr = [
      `${t}-${t + 1}`,
      `${t + 1}-${t + 2}`,
      `${b}-${b + 1}`,
      `${b + 1}-${b + 2}`,
      `${t}-${b}`,
      `${t + 2}-${b + 2}`,
    ];

    arr.forEach(road => {
      board.roads[road] = {
        id: road,
        player: null,
        neighbors: [],
        settlements: [],
      };
    });

    return arr;
  };

  const rows = [[1, 9], [8, 18], [17, 28], [29, 39], [40, 48]];
  let [t, b] = rows[0];

  for (let i = 1; i < 20; i++) {
    const index = Math.floor(Math.random() * resources.length);
    const diceIndex = Math.floor(Math.random() * diceValue.length);
    const type = resources.splice(index, 1)[0];
    board.resources[i] = {
      id: i,
      type,
      diceValue: type !== 'desert' ? diceValue.splice(diceIndex, 1)[0] : null,
      hasRobber: type === 'desert',
      settlements: createSettlements(t, b),
      roads: createRoads(t, b),
    };

    type === 'desert' && (board.robber = i);

    t += 2;
    b += 2;
    if (t === 7) [t, b] = rows[1];
    else if (t === 16) [t, b] = rows[2];
    else if (t === 27) [t, b] = rows[3];
    else if (t === 37) [t, b] = rows[4];
  }

  Object.keys(board.roads).forEach(road => {
    const settlements = road.split('-');
    const s1 = board.settlements[settlements[0]];
    const s2 = board.settlements[settlements[1]];
    board.roads[road].settlements.push(s1.id);
    board.roads[road].settlements.push(s2.id);
    s1.roads.push(road);
    s2.roads.push(road);
    s1.neighbors.push(s2.id);
    s2.neighbors.push(s1.id);
  });

  Object.keys(board.roads).forEach(road => {
    const settlements = road.split('-');
    const s1 = board.settlements[settlements[0]];
    const s2 = board.settlements[settlements[1]];
    const neighbors = [...s1.roads, ...s2.roads].filter(r => r !== road);
    board.roads[road].neighbors = neighbors;
  });

  return board;
};
