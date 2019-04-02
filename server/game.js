module.exports = name => ({
  name,
  mode: '',
  playerTurn: 1,
  responded: [true, false, false, false, false],
  devCards: [
    ...Array(14).fill('knight'),
    ...Array(5).fill('victory point'),
    ...Array(2).fill('road building'),
    ...Array(2).fill('monopoly'),
    ...Array(2).fill('year of plenty'),
  ],
  players: {},
});
