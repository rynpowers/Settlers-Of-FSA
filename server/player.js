module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  trades: [],
  resources: {
    forest: 100,
    pasture: 100,
    hill: 100,
    field: 100,
    mountain: 100,
  },
  devCards: {
    knight: 10,
    roadBuilding: 10,
    yearOfPlenty: 10,
    victoryPoint: 10,
    monopoly: 10,
  },
});
