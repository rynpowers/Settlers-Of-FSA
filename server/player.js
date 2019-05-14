module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  trades: [],
  resources: {
    forest: 5,
    pasture: 5,
    hill: 5,
    field: 5,
    mountain: 5,
  },
  devCards: {
    knight: 5,
    roadBuilding: 5,
    yearOfPlenty: 5,
    victoryPoint: 5,
    monopoly: 5,
  },
});
