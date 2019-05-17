const { Player, Game } = require('../db');

class GameEngine {
  constructor(board, gameState) {
    this.board = JSON.parse(board);
    this.players = {};
    this.gameState = JSON.parse(gameState);
    this.sockets = {};
    this.messages = [];
  }
  playing() {
    return this.gameState.playing;
  }

  start() {
    this.gameState.playing = true;
    return this.gameState;
  }

  addSocket(socket, player) {
    this.sockets = { ...this.sockets, [player]: socket };
    return { players: this.gameState.players };
  }

  removeSocket(socketId) {
    Object.keys(this.sockets).forEach(id => {
      if (this.sockets[id] === socketId) delete this.sockets[id];
    });
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

  payload() {
    return {
      sockets: this.sockets,
      players: this.players,
      game: { ...this.gameState, devCards: this.gameState.devCards.length },
      board: this.board,
    };
  }

  updateGame(...args) {
    this.updatePlayers(...args);

    Game.update(
      {
        gameState: JSON.stringify(this.gameState),
        board: JSON.stringify(this.board),
      },
      { where: { name: this.gameState.name } }
    );

    return this.payload();
  }

  exchangeResources(player) {
    const { playerTurn } = this.gameState;
    const resources = this.gameState.trades[player];
    Object.keys(resources).forEach(type => {
      this.players[playerTurn].resources[type] += resources[type];
      this.players[player].resources[type] -= resources[type];
    });
    this.gameState.mode = '';
    this.gameState.trades = {};

    return this.updateGame(player, playerTurn);
  }

  handleBank(player, resources) {
    Object.keys(resources).forEach(resource => {
      this.players[player].resources[resource] += resources[resource];
    });

    return this.updateGame(player);
  }

  handleTrade({ resources, player, action }) {
    const { trades } = this.gameState;
    switch (action) {
      case 'initiate':
        this.gameState.mode = 'trading';
        return this.payload();
      case 'add':
        trades[player] = resources;
        return this.payload();
      case 'reject':
        delete trades[player];
        return this.payload();
      case 'accept':
        return this.exchangeResources(player);
      case 'bank':
        return this.handleBank(player, resources);
      default:
        this.gameState.mode = 'trade';
        this.gameState.trades = {};
        this.messages = [];
        return this.payload();
    }
  }

  handleMessages(message) {
    this.messages.push(message);
    return { messages: this.messages };
  }

  handleGameState({ payload }) {
    Object.keys(payload).forEach(key => {
      this.gameState[key] = payload[key];
    });
    return this.payload();
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

  initiateRobber() {
    this.gameState.mode = 'robber';

    this.gameState.responded = this.gameState.responded.map((bool, i) => {
      return !i || (i && this.gameState.players[i].resources < 8);
    });

    return this.payload();
  }

  handleDiscard(update) {
    const { playerTurn, responded } = this.gameState;

    if (update) {
      this.gameState.responded[update.playerNumber] = true;
      this.players[update.playerNumber].resources = update.resources;
      this.gameState.players[update.playerNumber].resources = Object.keys(
        update.resources
      ).reduce((a, v) => a + update.resources[v], 0);
    }

    if (responded.every(p => p)) {
      this.gameState.flash = `Player-${playerTurn} please move the robber`;
      this.gameState.responded = [true, false, false, false, false];
      this.gameState.mode = 'move-robber';
    }

    return this.payload();
  }

  handleMoveRobber(update) {
    const { robber, resources } = this.board;
    const { playerTurn } = this.gameState;

    resources[robber].hasRobber = false;
    resources[update.id].hasRobber = true;
    this.board.robber = update.id;
    this.gameState.mode = 'rob-settlement';

    this.canRob(update)
      ? (this.gameState.flash = `player-${playerTurn} choose a settlement to rob`)
      : (this.gameState.mode = '');

    return this.payload();
  }

  handleRobSettlement(update) {
    const { settlements } = this.board;
    const player = this.players[settlements[update.id].player];

    const resources = Object.keys(player.resources).filter(
      type => player.resources[type] != 0
    );

    const resource = resources[Math.floor(Math.random() * resources.length)];

    if (resource) {
      this.players[update.player].resources[resource]++;
      player.resources[resource]--;
    }

    this.gameState.mode = '';

    return this.updateGame(update.player, player.playerNumber);
  }

  handleRobber(update) {
    switch (update.action) {
      case 'discard':
        return this.handleDiscard(update);
      case 'move-robber':
        return this.handleMoveRobber(update);
      case 'rob-settlement':
        return this.handleRobSettlement(update);
      default:
    }
  }

  handleFlash() {
    this.gameState.flash = '';
    return this.payload();
  }

  handleKnight(update) {
    this.gameState.responded = this.gameState.responded.map(() => true);
    this.players[update.player].devCards[update.card]--;
    this.players[update.player].largestArmy++;
    return this.handleDiscard();
  }

  handleRoadBuilding(update) {
    !this.gameState.roadBuilding
      ? (this.gameState.roadBuilding = 2)
      : this.gameState.roadBuilding--;

    if (this.gameState.roadBuilding) {
      this.gameState.mode = 'road';
      this.gameState.flash = 'Build a road';
      return this.payload();
    } else {
      this.gameState.mode = '';
      this.players[update.player].devCards.roadBuilding--;
      return this.updateGame(update.player);
    }
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
  }

  handleMonopoly(update) {
    if (this.gameState.mode === 'monopoly') {
      this.gameState.mode = '';
      this.monopolizeResource(update.player, update.resource, update.card);
      return this.updateGame(1, 2, 3, 4);
    } else {
      this.gameState.mode = 'monopoly';
      return this.payload();
    }
  }

  handleYearOfPlenty(update) {
    if (this.gameState.mode === 'yearOfPlenty') {
      Object.keys(update.resources).forEach(key => {
        this.players[update.player].resources[key] += update.resources[key];
      });
      this.gameState.mode = '';
      this.players[update.player].devCards[update.card]--;
      return this.updateGame(update.player);
    } else {
      this.gameState.mode = 'yearOfPlenty';
      return this.payload();
    }
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
        return this.payload();
    }
  }

  handleNextPlayer(update) {
    this.gameState.playerTurn =
      this.gameState.playerTurn < 4 ? update.player + 1 : 1;
    return this.payload();
  }

  handleDevCard(update) {
    const cards = this.gameState.devCards;
    const index = Math.floor(Math.random() * cards.length);
    const card = cards.splice(index, 1)[0];

    this.players[update.player].devCards[card]++;
    this.players[update.player].resources.field--;
    this.players[update.player].resources.mountain--;
    this.players[update.player].resources.pasture--;

    this.gameState.flash = `you have bought a ${card} card`;

    return this.updateGame(update.player);
  }

  handleDevelopment(update) {
    switch (update.action) {
      case 'get-card':
        return this.handleDevCard(update);
      case 'play-card':
        return this.handlePlayCard(update);
      default:
        return this.payload();
    }
  }

  incSettlementPhase() {
    const { settlement } = this.gameState;
    const phase = settlement.phase[++settlement.phaseIndex];

    if (phase === 'next') {
      settlement.phaseIndex = 0;
      this.gameState.playerTurn = settlement.round[++settlement.roundIndex];
    }

    if (!this.gameState.playerTurn) {
      settlement.complete = true;
      this.gameState.playerTurn = 1;
    }

    this.gameState.mode = '';

    return this.updateGame(1, 2, 3, 4);
  }

  handleSettlementPhase() {
    const { phase, phaseIndex } = this.gameState.settlement;
    this.gameState.mode = phase[phaseIndex];
    return this.payload();
  }

  update(update) {
    switch (update.type) {
      case 'settlement-phase':
        return this.handleSettlementPhase();
      case 'road':
        return this.assignRoad(update); // done
      case 'settlement':
        return this.assignSettlement(update); // done
      case 'diceValue':
        return this.updateDice(update); // done
      case 'player':
        return this.players[update.playerNumber];
      case 'message':
        return this.handleMessages(update); // done
      case 'trade':
        return this.handleTrade(update); // done
      case 'flash':
        return this.handleFlash(update); // done
      case 'game':
        return this.handleGameState(update);
      case 'robber':
        return this.handleRobber(update); // done
      case 'development':
        return this.handleDevelopment(update);
      case 'next-player':
        return this.handleNextPlayer(update);
      default:
        return this.payload();
    }
  }

  assignRoad(update) {
    this.board.roads[update.id].player = update.player;
    const prevRoad = this.players[update.player].longestRoad;

    if (prevRoad < update.longestRoad) {
      this.players[update.player].longestRoad = update.longestRoad;
    }

    if (!this.gameState.settlement.complete)
      return this.incSettlementPhase(update.player);
    else if (this.gameState.roadBuilding)
      return this.handleRoadBuilding(update);

    this.players[update.player].resources.hill--;
    this.players[update.player].resources.forest--;

    this.gameState.mode = '';

    return this.updateGame(update.player);
  }

  assignSettlement({ id, playerNumber }) {
    const { settlement } = this.gameState;
    this.board.settlements[id].player = playerNumber;
    this.board.settlements[id].build += 1;

    if (!settlement.complete) {
      if (settlement.roundIndex > 3) {
        const { settlements, resources } = this.board;
        Object.values(resources).forEach(resource => {
          resource.settlements.forEach(s => {
            if (settlements[s].player === playerNumber) {
              this.players[playerNumber].resources[resource.type]++;
            }
          });
        });
      }
      return this.incSettlementPhase(playerNumber);
    }

    if (this.board.settlements[id].build === 1) {
      this.players[playerNumber].resources.hill--;
      this.players[playerNumber].resources.forest--;
      this.players[playerNumber].resources.field--;
      this.players[playerNumber].resources.pasture--;
    } else if (this.board.settlements[id].build === 2) {
      this.players[playerNumber].resources.field -= 2;
      this.players[playerNumber].resources.mountain -= 3;
    }

    return this.updateGame(playerNumber);
  }

  updateDice({ diceValue }) {
    this.gameState.diceValue = diceValue;
    this.gameState.mode = 'roll';

    if (this.gameState.diceValue == 7) return this.initiateRobber();

    return this.updateGame(...this.distributeResources(diceValue));
  }

  distributeResources(diceValue) {
    const { resources, settlements } = this.board;
    const updatedPlayers = {};
    Object.keys(resources).forEach(id => {
      const resource = resources[id];
      if (
        resource.diceValue == diceValue &&
        !resource.hasRobber &&
        resource.type !== 'desert'
      ) {
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
