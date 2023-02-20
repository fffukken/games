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

function showAnswer() {
    // Create a new table to display answer
    let answerTable = document.createElement("table");
    answerTable.id = "answer-table";
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < COLS; j++) {
            let cell = document.createElement("td");
            cell.innerText = getAnswer(i, j);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    answerTable.appendChild(tableBody);

    // Insert the answer table into the document
    let board = document.getElementById("board");
    board.parentNode.insertBefore(answerTable, board.nextSibling);
}

function getAnswer(row, col) {
    let answer = board[row][col];
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) {
                continue;
            }
            let newRow = row + r;
            let newCol = col + c;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
                continue;
            }
            answer += board[newRow][newCol];
        }
    }
    return answer % 2;
}
// create initial board on page load
// createBoard();