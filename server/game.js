module.exports = name => ({
  name,
  playerTurn: 0,
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
