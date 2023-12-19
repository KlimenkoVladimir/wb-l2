const rowCount = 20;
const columnCount = 10;
const figures = {
  I: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

class Tetris {
  constructor() {
    this.field;
    this.figure;
    this.isGameOver = false;
    this.score = 0;
    this.difficulty = 700;
    this.init();
  }

  setDifficulty(value) {
    this.difficulty = value;
    console.log(this.difficulty);
    document.querySelector(".start").style.display = "none";
  }

  init() {
    this.renderEmptyField();
    this.renderFigure();
  }

  renderEmptyField() {
    this.field = new Array(rowCount)
      .fill()
      .map(() => new Array(columnCount).fill(0));
  }

  renderFigure() {
    const name = this.getRandomFigure();
    const matrix = figures[name];
    const column = columnCount / 2 - Math.floor(matrix.length / 2);
    const row = -3;
    console.log(name, matrix, column, row);

    this.figure = {
      name,
      matrix,
      column,
      row,
    };
  }

  getRandomFigure() {
    const randomIndex = Math.floor(Math.random() * Object.keys(figures).length);
    console.log(randomIndex);
    return Object.keys(figures)[randomIndex];
  }

  moveDown() {
    this.figure.row++;
    if (!this.isValid()) {
      this.figure.row--;
      this.placeFigure();
    }
  }

  moveLeft() {
    this.figure.column--;
    if (!this.isValid()) {
      this.figure.column++;
    }
  }
  moveRight() {
    this.figure.column++;
    if (!this.isValid()) {
      this.figure.column--;
    }
  }
  rotate() {
    const oldMatrix = this.figure.matrix;
    const newMatrix = [];
    const matrixSize = oldMatrix.length;

    for (let row = 0; row < matrixSize; row++) {
      newMatrix[row] = [];
      for (let column = 0; column < matrixSize; column++) {
        newMatrix[row][column] = oldMatrix[matrixSize - column - 1][row];
      }
    }
    this.figure.matrix = newMatrix;
    if (!this.isValid()) {
      this.figure.matrix = oldMatrix;
    }
  }

  isValid() {
    const matrixSize = this.figure.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      for (let column = 0; column < matrixSize; column++) {
        if (!this.figure.matrix[row][column]) continue;
        // Проверяем чтобы фигура не выходила за пределы поля
        if (
          this.figure.row + row >= rowCount ||
          this.figure.column + column < 0 ||
          this.figure.column + column >= columnCount
        ) {
          return false;
        }
        // Проверяем чтобы фигура не наезжала на другие фигурки
        if (this.field[this.figure.row + row]?.[this.figure.column + column]) {
          console.log(
            this.field[this.figure.row + row]?.[this.figure.column + column]
          );
          return false;
        }
      }
    }
    return true;
  }

  placeFigure() {
    const matrixSize = this.figure.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
      if (this.figure.row + row < 0) {
        this.gameOver();
        return;
      }
      for (let column = 0; column < matrixSize; column++) {
        if (!this.figure.matrix[row][column]) continue;

        this.field[this.figure.row + row][this.figure.column + column] =
          this.figure.name;
      }
    }
    this.clearRow();
    this.renderFigure();
    console.log("render");
  }

  clearRow() {
    const fieldRows = [];
    for (let row = 0; row < rowCount; row++) {
      if (this.field[row].every((cell) => Boolean(cell))) {
        fieldRows.push(row);
      }
    }
    console.log(fieldRows);
    console.log(this.field);
    fieldRows.forEach((filledRow) => {
      for (let row = filledRow; row > 0; row--) {
        this.field[row] = this.field[row - 1];
        this.field[0] = new Array(columnCount).fill(0);
      }
    });
    // В зависимости от количества заполненных рядов, добавляет очки
    switch (fieldRows.length) {
      case 1:
        this.score += 100;
        break;
      case 2:
        this.score += 300;
        break;
      case 3:
        this.score += 700;
        break;
      case 4:
        this.score += 1500;
        break;

      default:
        break;
    }
    scoreElement.innerHTML = this.score;
  }

  gameOver() {
    this.isGameOver = true;
    stopLoop();
    document.removeEventListener("keydown", onKeyDown);
    document.querySelector(".modal").style.display = "block";
    document.querySelector("span").textContent = this.score;
  }
}

const tetris = new Tetris();
console.log(tetris);

const cells = document.querySelectorAll(".grid>div");
const scoreElement = document.querySelector(".score");
let requestId;
let timeoutId;

document.addEventListener("keydown", onKeyDown);

startGame();

function startGame() {
  document.querySelector(".modal").style.display = "none";
  tetris.moveDown();
  render();
  startLoop();
}

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      tetris.rotate();
      render();
      break;
    case "ArrowDown":
      tetris.moveDown();
      render();
      stopLoop();
      startLoop();
      break;
    case "ArrowLeft":
      tetris.moveLeft();
      render();
      break;

    case "ArrowRight":
      tetris.moveRight();
      render();
      break;

    default:
      break;
  }
}

function render() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  renderField();
  renderFigure();
}

function renderField() {
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (!tetris.field[row][column]) continue;
      const cellIndex = row * columnCount + column;
      cells[cellIndex].classList.add(tetris.field[row][column]);
    }
  }
}

function renderFigure() {
  const matrixSize = tetris.figure.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetris.figure.matrix[row][column]) continue;
      if (tetris.figure.row + row < 0) continue;
      const cellIndex =
        (tetris.figure.row + row) * columnCount +
        (tetris.figure.column + column);
      cells[cellIndex].classList.add(tetris.figure.name);
    }
  }
}

function startLoop() {
  timeoutId = setTimeout(
    () =>
      (requestId = requestAnimationFrame(() => {
        tetris.moveDown();
        render();
        if (!tetris.isGameOver) {
          startLoop();
        }
      })),
    tetris.difficulty
  );
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeoutId);
}
