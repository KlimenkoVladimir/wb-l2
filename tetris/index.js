const rowCount = 20;
const columnCount = 10;
const figures = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

class Tetris {
  constructor() {
    this.field;
    this.figure;
    this.init();
  }

  init() {
    this.renderField();
  }

  renderField() {
    this.field = new Array(rowCount)
      .fill()
      .map(() => new Array(columnCount).fill(0));
  }

  renderFigure() {
    const name = getRandomFigure();
    const matrix = figures[name];
    const column = rowCount / 2 - Math.floor(matrix.length / 2);
    const row = 3;

    this.figure = {
      nome,
      matrix,
      column,
      row,
    };
  }

  getRandomFigure() {
    const randomIndex = Math.floor(Math.random()) * Object.keys(figures).length;
    return Object.keys(figures)[randomIndex];
  }
}

const tetris = new Tetris();
