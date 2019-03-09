const createBoard = require('./board');

const testBoard = createBoard();

testBoard.settlements[10] = {
  ...testBoard.settlements[10],
  player: 1,
  build: 1,
};
testBoard.settlements[12] = {
  ...testBoard.settlements[12],
  player: 1,
  build: 1,
};
testBoard.roads['10-11'] = { ...testBoard.roads['10-11'], player: 1 };
testBoard.roads['11-12'] = { ...testBoard.roads['11-12'], player: 1 };

testBoard.settlements[14] = {
  ...testBoard.settlements[14],
  player: 2,
  build: 1,
};
testBoard.settlements[25] = {
  ...testBoard.settlements[25],
  player: 2,
  build: 1,
};
testBoard.roads['14-24'] = { ...testBoard.roads['14-24'], player: 2 };
testBoard.roads['24-25'] = { ...testBoard.roads['24-25'], player: 2 };

testBoard.settlements[42] = {
  ...testBoard.settlements[42],
  player: 3,
  build: 1,
};
testBoard.settlements[31] = {
  ...testBoard.settlements[31],
  player: 3,
  build: 1,
};
testBoard.roads['31-41'] = { ...testBoard.roads['31-41'], player: 3 };
testBoard.roads['41-42'] = { ...testBoard.roads['41-42'], player: 3 };

testBoard.settlements[44] = {
  ...testBoard.settlements[44],
  player: 4,
  build: 1,
};
testBoard.settlements[35] = {
  ...testBoard.settlements[35],
  player: 4,
  build: 1,
};
testBoard.roads['35-45'] = { ...testBoard.roads['35-45'], player: 4 };
testBoard.roads['44-45'] = { ...testBoard.roads['44-45'], player: 4 };

module.exports = testBoard;
