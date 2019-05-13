module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  trades: [],
  resources: {
    forest: 2,
    pasture: 2,
    hill: 0,
    field: 2,
    mountain: 2,
  },
  devCards: {
    knight: 0,
    roadBuilding: 0,
    yearOfPlenty: 0,
    victoryPoint: 0,
    monopoly: 0,
  },
});
