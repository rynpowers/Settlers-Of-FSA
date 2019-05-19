module.exports = name => ({
  name,
  playing: true,
  rolled: false,
  devCardPlayed: false,
  mode: '',
  playerTurn: 1,
  settlement: {
    complete: true,
    phase: ['settlement', 'road', 'next'],
    phaseIndex: 0,
    round: [1, 2, 3, 4, 4, 3, 2, 1],
    roundIndex: 0,
  },
  responded: [true, false, false, false, false],
  flash: '',
  devCards: [
    ...Array(14).fill('knight'),
    ...Array(5).fill('victoryPoint'),
    ...Array(2).fill('roadBuilding'),
    ...Array(2).fill('monopoly'),
    ...Array(2).fill('yearOfPlenty'),
  ],
  players: {},
  trades: {},
});
