const createRow = (board, i, even, left, right, offset) => {
  if (i % 2 === even) {
    board.roads[`${i}-${i + offset}`] = {
      player: null,
      settlements: [i, i + offset],
    };
    board.settlements[i].roads.push(`${i}-${i + offset}`);
    board.settlements[i + offset].roads.push(`${i}-${i + offset}`);
  }
  if (i < right) {
    board.settlements[i].roads.push(`${i}-${i + 1}`);
    board.roads[`${i}-${i + 1}`] = { player: null, settlements: [i, i + 1] };
  }
  i > left && board.settlements[i].roads.push(`${i - 1}-${i}`);
};

const board = {
  Resources: {
    1: { type: 'forrest', settlements: [1, 2, 3, 9, 10, 11] },
    2: { type: 'field', settlements: [3, 4, 5, 11, 12, 13] },
    3: { type: 'mountain', settlements: [5, 6, 7, 13, 14, 15] },
    4: { type: 'hill', settlements: [8, 9, 10, 18, 19, 20] },
    5: { type: 'pasture', settlements: [10, 11, 12, 20, 21, 22] },
    6: { type: 'hill', settlements: [12, 13, 14, 22, 23, 24] },
    7: { type: 'mountain', settlements: [14, 15, 16, 24, 25, 26] },
    8: { type: 'mountain', settlements: [17, 18, 19, 28, 29, 30] },
    9: { type: 'pasture', settlements: [19, 20, 21, 30, 31, 32] },
    10: { type: 'desert', settlements: [21, 22, 23, 32, 33, 34] },
    11: { type: 'field', settlements: [23, 24, 25, 34, 35, 36] },
    12: { type: 'pasture', settlements: [25, 26, 28, 36, 37, 38] },
    13: { type: 'hill', settlements: [29, 30, 31, 39, 40, 41] },
    14: { type: 'forrest', settlements: [31, 32, 33, 41, 42, 43] },
    15: { type: 'field', settlements: [33, 34, 35, 43, 44, 45] },
    16: { type: 'forrest', settlements: [35, 36, 37, 45, 46, 47] },
    17: { type: 'field', settlements: [40, 41, 42, 48, 49, 50] },
    18: { type: 'forrest', settlements: [42, 43, 44, 50, 51, 52] },
    19: { type: 'pasture', settlements: [44, 45, 46, 52, 53, 54] },
  },
  settlements: {},
  roads: {},
};

for (let j = 1; j < 55; j++) {
  board.settlements[j] = { player: null, roads: [] };
}

for (let i = 1; i <= 54; i++) {
  if (i < 8) createRow(board, i, 1, 1, 7, 8);
  else if (i < 17) createRow(board, i, 0, 8, 16, 10);
  else if (i < 28) createRow(board, i, 1, 17, 27, 11);
  else if (i < 39) createRow(board, i, 1, 28, 38, 10);
  else if (i < 48) createRow(board, i, 0, 39, 47, 8);
  else createRow(board, i, 2, 48, 54);
}

module.exports = JSON.stringify(board);
