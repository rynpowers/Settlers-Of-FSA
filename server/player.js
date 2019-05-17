module.exports = playerNumber => ({
  playerNumber,
  victoryPoints: 0,
  playerTurn: false,
  longestRoad: 0,
  largestArmy: 0,
  trades: [],
  resources: {
    forest: 50,
    pasture: 50,
    hill: 50,
    field: 50,
    mountain: 50,
  },
  devCards: {
    knight: 5,
    roadBuilding: 5,
    yearOfPlenty: 5,
    victoryPoint: 5,
    monopoly: 5,
    purchased: [],
  },
});
