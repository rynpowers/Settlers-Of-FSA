const { Player } = require('../db');

class GameEngine {
  constructor(board, gameState) {
    this.board = JSON.parse(board);
    this.players = {};
    this.gameState = JSON.parse(gameState);
    this.sockets = {};
    this.messages = [];
    this.trades = {};
  }
  addSocket(socket, player) {
    this.sockets = { ...this.sockets, [player]: socket };
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

  send(key, fn) {
    fn({ [key]: this[key] });
  }

  parsePlayer(player) {
    return {
      resources: Object.keys(player.resources).reduce(
        (a, v) => a + player.resources[v],
        0
      ),
      devCards: Object.keys(player.devCards).reduce(
        (a, v) => a + +player.devCards[v],
        0
      ),
      largestArmy: player.largestArmy,
      longestRoad: player.longestRoad,
      victoryPoints: player.victoryPoints,
    };
  }

  updatePlayers(...args) {
    args.forEach(player => {
      this.gameState.players[player] = this.parsePlayer(this.players[player]);
      Player.update(
        { state: JSON.stringify(this.players[player]) },
        { where: { playerNumber: player, gameName: this.gameState.name } }
      );
    });
  }

  getGameState(playerNumber) {
    const { players, board, gameState } = this;
    return {
      player: players[playerNumber],
      board,
      gameState: { ...gameState, devCards: gameState.devCards.length },
    };
  }

  exchangeResources(player) {
    const { playerTurn } = this.gameState;
    const resources = this.trades[player];
    Object.keys(resources).forEach(type => {
      this.players[playerTurn].resources[type] += resources[type];
      this.players[player].resources[type] -= resources[type];
    });
    this.gameState.mode = '';
    this.updatePlayers(playerTurn, player);
    this.trades = {};
    return { payload: { game: this.gameState, accepted: true } };
  }

  handleTrade({ resources, player, action }) {
    switch (action) {
      case 'add':
        this.trades[player] = resources;
        return { payload: { trades: this.trades } };
      case 'reject':
        delete this.trades[player];
        return { payload: { trades: this.trades } };
      case 'accept':
        return this.exchangeResources(player);
      default:
        return this.trades;
    }
  }

  handleMessages(message) {
    this.messages.push(message);
    return { payload: { messages: this.messages } };
  }

  handleGameState({ payload }) {
    Object.keys(payload).forEach(key => {
      this.gameState[key] = payload[key];
    });
    return { payload: { game: this.gameState } };
  }

  handleRobber(update) {
    if (update) {
      this.gameState.responded[update.playerNumber] = true;
      this.players[update.playerNumber].resources = update.resources;
      this.updatePlayers(update.playerNumber);
    }

    const complete = this.gameState.responded.every(player => player);

    if (complete) {
      this.gameState.mode = 'acknowledgeMoveRobber';
      this.gameState.flash = `Player-${
        this.gameState.playerTurn
      } please move the robber`;
      this.gameState.responded = [true, false, false, false, false];
    }

    return { type: ['game'], payload: { game: this.gameState } };
  }

  handleFlash(update) {
    this.gameState.flash = '';
    this.gameState.mode = update.mode || '';
    return { payload: { game: this.gameState } };
  }

  canRob(update) {
    const { resources, settlements } = this.board;
    const set = resources[update.id].settlements.reduce((a, v) => {
      const { player } = settlements[v];
      if (player && player != update.player) a.add(player);
      return a;
    }, new Set());

    return set.size !== 0;
  }

  handleMoveRobber(update) {
    const { robber, resources } = this.board;

    resources[robber].hasRobber = false;
    resources[update.id].hasRobber = true;
    this.board.robber = update.id;

    if (this.canRob(update)) {
      this.gameState.mode = 'acknowledgeRobSettlement';
      this.gameState.flash = `player-${
        this.gameState.playerTurn
      } choose a settlement to rob`;
    } else this.gameState.mode = '';

    return {
      type: ['board', 'game'],
      payload: { board: this.board, game: this.gameState },
    };
  }

  handleRobSettlement(update) {
    const { settlements } = this.board;
    const player = this.players[settlements[update.id].player];

    const resources = Object.keys(player.resources).filter(type => {
      return player.resources[type] != 0;
    });

    const resource = resources[Math.floor(Math.random() * resources.length)];

    if (resource) {
      this.players[update.player].resources[resource]++;
      player.resources[resource]--;
      this.updatePlayers(update.player, player.playerNumber);
    }

    this.gameState.mode = '';

    return { type: ['game'], payload: { game: this.gameState } };
  }

  handleDevCard(update) {
    const cards = this.gameState.devCards;
    const index = Math.floor(Math.random() * cards.length);
    const card = cards.splice(index, 1)[0];

    this.players[update.player].devCards[card]++;
    this.updatePlayers(update.player);
    this.gameState.flash = `you have bought a ${card} card`;

    return { type: ['game'], payload: { game: this.gameState } };
  }

  handleKnight(update) {
    this.gameState.responded = this.gameState.responded.map(() => true);
    this.players[update.player].devCards[update.card]--;
    this.players[update.player].largestArmy++;
    this.updatePlayers(update.player);
    return this.handleRobber();
  }

  handleRoadBuilding(update) {
    if (!this.gameState.roadBuilding) {
      const cards = this.players[update.player].devCards[update.card];
      this.players[update.player].devCards[update.card] = cards - 1;
      this.updatePlayers(update.player);
      this.gameState.roadBuilding = 1;
    } else {
      this.gameState.roadBuilding--;
    }

    this.gameState.mode = 'roadBuilding';
    this.gameState.flash = 'Build a road';

    return {
      type: ['game', 'board'],
      payload: { game: this.gameState, board: this.board },
    };
  }

  monopolizeResource(id, resource, card) {
    let total = 0;
    Object.keys(this.players).forEach(player => {
      if (player != id) {
        total += this.players[player].resources[resource];
        this.players[player].resources[resource] = 0;
      }
    });
    this.players[id].resources[resource] += total;
    this.players[id].devCards[card]--;
    this.updatePlayers(1, 2, 3, 4);
  }

  handleMonopoly(update) {
    if (this.gameState.mode === 'monopoly') {
      this.gameState.mode = '';
      this.monopolizeResource(update.player, update.resource, update.card);
    } else {
      this.gameState.mode = 'monopoly';
    }
    return { type: ['game'], payload: { game: this.gameState } };
  }

  handleYearOfPlenty(update) {
    if (this.gameState.mode === 'yearOfPlenty') {
      Object.keys(update.resources).forEach(key => {
        this.players[update.player].resources[key] += update.resources[key];
      });
      this.gameState.mode = '';
      this.players[update.player].devCards[update.card]--;
      this.updatePlayers(update.player);
    } else {
      this.gameState.mode = 'yearOfPlenty';
    }
    return { type: ['game'], payload: { game: this.gameState } };
  }

  handlePlayCard(update) {
    switch (update.card) {
      case 'knight':
        return this.handleKnight(update);
      case 'roadBuilding':
        return this.handleRoadBuilding(update);
      case 'monopoly':
        return this.handleMonopoly(update);
      case 'yearOfPlenty':
        return this.handleYearOfPlenty(update);
      default:
        return { payload: { game: this.gameState, update } };
    }
  }

  update(update) {
    switch (update.type) {
      case 'road':
        return this.assignRoad(update);
      case 'settlement':
        return this.assignSettlement(update);
      case 'diceValue':
        return this.updateDice(update);
      case 'player':
        return this.players[update.playerNumber];
      case 'message':
        return this.handleMessages(update);
      case 'trade':
        return this.handleTrade(update);
      case 'game':
        return this.handleGameState(update);
      case 'robber':
        return this.handleRobber(update);
      case 'flash':
        return this.handleFlash(update);
      case 'move-robber':
        return this.handleMoveRobber(update);
      case 'rob-settlement':
        return this.handleRobSettlement(update);
      case 'get-card':
        return this.handleDevCard(update);
      case 'play-card':
        return this.handlePlayCard(update);
      default:
    }
  }

  assignRoad(update) {
    this.board.roads[update.id].player = update.player;
    const prevRoad = this.players[update.player].longestRoad;

    if (prevRoad < update.longestRoad) {
      this.players[update.player].longestRoad = update.longestRoad;
    }

    if (this.gameState.roadBuilding) {
      return this.handleRoadBuilding(update);
    }

    this.updatePlayers(update.player);
    this.gameState.mode = '';

    return {
      type: ['board', 'game'],
      payload: { board: this.board, game: this.gameState },
    };
  }

  assignSettlement({ id, playerNumber }) {
    this.board.settlements[id].player = playerNumber;
    this.board.settlements[id].build += 1;
    return { type: ['board'], payload: { board: this.board } };
  }

  updateDice({ diceValue }) {
    this.gameState.diceValue = diceValue;
    this.gameState.mode = 'roll';

    if (this.gameState.diceValue == 7) {
      this.gameState.mode = 'robber';
      this.gameState.responded = this.gameState.responded.map((bool, i) => {
        return !i || (i && this.gameState.players[i].resources < 8);
      });
      return this.handleRobber();
    }
    this.updatePlayers(...this.distributeResources(diceValue));
    return { type: ['game'], payload: { game: this.gameState } };
  }

  distributeResources(diceValue) {
    const { resources, settlements } = this.board;
    const updatedPlayers = {};
    Object.keys(resources).forEach(id => {
      const resource = resources[id];
      if (resource.diceValue == diceValue && !resource.hasRobber) {
        resource.settlements.forEach(settlementId => {
          const { build, player } = settlements[settlementId];
          if (build) {
            updatedPlayers[player] = true;
            this.players[player].resources[resource.type] += build;
          }
        });
      }
    });
    return Object.keys(updatedPlayers);
  }
}

module.exports = GameEngine;
