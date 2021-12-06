const { instructions, boards } = require('./input.js');
class Cell {
  constructor(value, row, col) {
    this.value = value; 
    this.marked = false;
    this.row = row;
    this.col = col
  }

  mark() {
    this.marked = true
  }
}

class Board {
  constructor(boardString) {
    this.boardString = boardString;
    this.board = boardString.split(/\n/).map((row, i) => row.split(/[ ]{1,2}/).map((val, idx) => {
      return new Cell(Number(val), i, idx);
    }));
  }

  findValue(val) {
   return  this.board.flat().find((cell) => cell.value === val);
  }

  findUnmarked() {
    return this.board.flat().filter((cell) => !cell.marked);
  }

  markCell(val) {
    const foundCell = this.findValue(val);
    if(!foundCell) return;
    foundCell.mark();
  }

  checkBoard(val) {
    this.markCell(val);
    return this.didIWin(val);
  }

  didIWin() {
    const cols = [];
    for (let i = 0;i < 5; i++) {
      cols.push(this.board.flat().filter((cell) => cell.col === i));
    }

    const checkedRows = this.board.map((row) => row.every((cell) => cell.marked)).some((row) => row);
    const checkedCols = cols.map((c) => c.every((cell) => cell.marked)).some((c) => c);

    return checkedCols || checkedRows;
  }

  showBoard() {
    console.log(this.board);
  }
}

const setupBoards = boards.map((board) => new Board(board));

const numberedInstructions = instructions.split(',').map((v) => Number(v));

const wonBoards = [];

setupBoards.forEach((board) => {
  let cursor = 0;
  let won = false;

  
  while (cursor < 21) {
    won = board.checkBoard(numberedInstructions[cursor]);
    if (won) { wonBoards.push({ board, winningNumber: numberedInstructions[cursor], idx: cursor })}
    cursor++;
  }
});

console.log(setupBoards[11].findUnmarked().map((cell) => cell.value));

const winningBoard = wonBoards.find((board) => board.idx === 20);
const sumUnmarked = winningBoard.board.findUnmarked().map((cell) => cell.value).reduce((acc, curr) => acc + curr, 0);

console.log(winningBoard.board.findUnmarked().map((cell) => cell.value).reduce((a, c) => a + c) * 99);


  
