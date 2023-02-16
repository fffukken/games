let ROWS = 5;
let COLS = 5;
let board = [];

function createBoard() {
    // get rows and cols values from input elements
    ROWS = parseInt(document.getElementById("rows").value);
    COLS = parseInt(document.getElementById("cols").value);

    // clear board
    board = [];
    let table = document.getElementById("board");
    table.innerHTML = "";

    // create new board
    for (let i = 0; i < ROWS; i++) {
        let row = table.insertRow();
        board.push([]);
        for (let j = 0; j < COLS; j++) {
            let cell = row.insertCell();
            cell.onclick = function () {
                toggle(i, j);
            };
            let state = 1;
            cell.innerHTML = state;
            if (state === 1) {
                cell.classList.add("on");
            }
            board[i].push(state);
        }
    }
}

function toggle(row, col) {
    let cell = document.getElementById("board").rows[row].cells[col];
    let state = board[row][col];
    cell.innerHTML = state ? 0 : 1;
    board[row][col] = state ? 0 : 1;
    if (state === 1) {
        cell.classList.remove("on");
    } else {
        cell.classList.add("on");
    }
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (Math.abs(row - r) + Math.abs(col - c) === 1) {
                let adjacentCell = document.getElementById("board").rows[r].cells[c];
                let adjacentState = board[r][c];
                adjacentCell.innerHTML = adjacentState ? 0 : 1;
                board[r][c] = adjacentState ? 0 : 1;
                if (adjacentState === 1) {
                    adjacentCell.classList.remove("on");
                } else {
                    adjacentCell.classList.add("on");
                }
            }
        }
    }

    // check if all lights are off
    let gameOver = true;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] === 1) {
                gameOver = false;
                break;
            }
        }
        if (!gameOver) {
            break;
        }
    }
    // display game over message
    if (gameOver) {
        alert("Game over! Congratulations!");
    }
}

// create initial board on page load
// createBoard();