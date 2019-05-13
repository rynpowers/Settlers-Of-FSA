module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  trades: [],
  resources: {
    forest: 10,
    pasture: 10,
    hill: 10,
    field: 10,
    mountain: 10,
  },
  devCards: {
    knight: 0,
    roadBuilding: 0,
    yearOfPlenty: 0,
    victoryPoint: 0,
    monopoly: 0,
  },
});
