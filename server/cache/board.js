class Board {
  constructor(board) {
    this.board = JSON.parse(board);
  }
  getBoard() {
    return this.board;
  }
}

module.exports = Board;
