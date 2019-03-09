module.exports = () => {
  const board = {
    resources: {},
    settlements: {},
    roads: {},
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
      board.settlements[item] = { player: null, roads: [], build: 0 };
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
      board.roads[road] = { player: null, settlements: [] };
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
      type,
      diceValue: type !== 'desert' ? diceValue.splice(diceIndex, 1)[0] : null,
      hasRobber: type === 'desert',
      settlements: createSettlements(t, b),
      roads: createRoads(t, b),
    };
    t += 2;
    b += 2;
    if (t === 7) [t, b] = rows[1];
    else if (t === 16) [t, b] = rows[2];
    else if (t === 27) [t, b] = rows[3];
    else if (t === 37) [t, b] = rows[4];
  }

  Object.keys(board.roads).forEach(road => {
    const settlements = road.split('-');
    board.settlements[settlements[0]].roads.push(road);
    board.settlements[settlements[1]].roads.push(road);
    board.roads[road].settlements = settlements;
  });
  return board;
};
