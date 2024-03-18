const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(cell, index) {
  if (gameState[index] !== "" || !currentPlayer) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("occupied");

  if (checkForWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    currentPlayer = null;
  } else if (isDraw()) {
    status.textContent = "It's a draw!";
    currentPlayer = null;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkForWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      highlightWinningCells(a, b, c);
      return true;
    }
  }
  return false;
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add("win");
  cells[b].classList.add("win");
  cells[c].classList.add("win");
}

function isDraw() {
  return !gameState.includes("");
}

function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("occupied", "win");
  });
  status.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

restartButton.addEventListener("click", restartGame);

restartGame();
