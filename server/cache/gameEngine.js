class GameEngine {
  constructor(board, gameState) {
    this.board = JSON.parse(board);
    this.players = {};
    this.gameState = JSON.parse(gameState);
  }
  addPlayer(player) {
    const { playerNumber, state } = player;
    if (!this.players[playerNumber]) {
      this.players[playerNumber] = JSON.parse(state);
      this.gameState.players[playerNumber] = this.parsePlayer(
        this.players[playerNumber]
      );
      console.log('adding player:', this.gameState.players);
    }
  }

  parsePlayer(player) {
    return {
      resources: Object.keys(player.resources).reduce(
        (a, v) => a + player.resources[v],
        0
      ),
      largestArmy: player.largestArmy,
      longestRoad: player.longestRoad,
      victoryPoints: player.victoryPoints,
    };
  }

  getGameState(playerNumber) {
    const { players, board, gameState } = this;
    return {
      player: players[playerNumber],
      board,
      gameState: { ...gameState, devCards: gameState.devCards.length },
    };
  }

  update({ type, playerNumber, id }) {
    switch (type) {
      case 'road':
        return this.assignRoad(id, playerNumber);
      case 'settlement':
        return this.assignSettlement(id, playerNumber);
      default:
    }
  }

  assignRoad(id, player) {
    this.board.roads[id].player = player;
    return this.board;
  }

  assignSettlement(id, player) {
    this.board.settlements[id].player = player;
    this.board.settlements[id].build += 1;
    return this.board;
  }
}

module.exports = GameEngine;
