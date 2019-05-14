module.exports = name => ({
  name,
  mode: '',
  playerTurn: 1,
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
