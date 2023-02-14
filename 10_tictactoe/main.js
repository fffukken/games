init = () => {
    const board = document.getElementById("board");
    const result = document.getElementById("result");
    let currentPlayer = "x";

    const checkWin = (player) => {
        const cells = board.getElementsByTagName("td");
        let win = false;
        for (let i = 0; i < 9; i += 3) {
            if (cells[i].textContent === player && cells[i + 1].textContent === player && cells[i + 2].textContent === player) {
                win = true;
                break;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (cells[i].textContent === player && cells[i + 3].textContent === player && cells[i + 6].textContent === player) {
                win = true;
                break;
            }
        }
        if (cells[0].textContent === player && cells[4].textContent === player && cells[8].textContent === player) {
            win = true;
        }
        if (cells[2].textContent === player && cells[4].textContent === player && cells[6].textContent === player) {
            win = true;
        }
        return win;
    };
    board.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "TD") {
            return;
        }
        if (target.textContent !== "") {
            return;
        }
        target.textContent = currentPlayer;
        target.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer}の勝利です`);
            return;
        }
        currentPlayer = currentPlayer === "x" ? "o" : "x";
    });
}

window.onload = () => {
    init();
}