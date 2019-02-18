class Player {
  constructor(state) {
    this.state = JSON.parse(state);
  }
  getState() {
    return this.state;
  }
}

module.exports = Player;
