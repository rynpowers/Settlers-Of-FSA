module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  resources: {
    forrest: 0,
    pasture: 0,
    hill: 0,
    field: 0,
    mountain: 0,
  },
  devCards: {
    knight: 0,
    roadBuilding: 0,
    yearOfPlenty: 0,
    victoryPoint: 0,
    monopoly: 0,
  },
});
