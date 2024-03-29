const board = []
const xNos = 4;
const yNos = 4;


const init = () => {
    const container = document.createElement("div");
    let message = document.getElementById("message")
    container.style.position = "relative";
    document.body.appendChild(container);

    message.textContent = "すべての赤パネルを青にしよう！"

    for (let y = 0; y < yNos; y++) {
        board[y] = [];
        for (let x = 0; x < xNos; x++) {
            const panel = document.createElement("div");
            panel.style.position = `absolute`;
            panel.style.left = `${x * 100 + 2}px`;
            panel.style.top = `${y * 100 + 20}px`;
            panel.style.width = `96px`;
            panel.style.height = `96px`;
            panel.style.backgroundColor = `#f00`;
            panel.style.borderRadius = `10px`;

            panel.style.transition = `all 150ms linear`;
            container.appendChild(panel);

            board[y][x] = { panel, color: 0 };
            panel.onpointerdown = (e) => {
                e.preventDefault();
                ondown(x, y);
            }
        }
    }
}

let isAnimation = false;
const flip = async (x, y) => {
    if (x < 0 || y < 0 || x >= xNos || y >= yNos) {
        return;
    }
    isAnimation = true;
    const panel = board[y][x].panel;
    let color = board[y][x].color;
    color = 1 - color;
    board[y][x].color = color;

    panel.style.transform = "perspective(150px) rotateY(90deg)";
    await new Promise(r => setTimeout(r, 150));
    panel.style.backgroundColor = color ? "#00f" : "#f00";

    panel.style.transform = "perspective(150px) rotateY(-90deg)"
    panel.parentElement.appendChild(panel)
    await new Promise(r => setTimeout(r, 50));
    panel.style.backgroundColor = color ? "#00f" : "#f00";
    panel.style.transform = "perspective(150px) rotateY(0deg)"
    await new Promise(r => setTimeout(r, 150));


    isAnimation = false;
}

let isGameover = false;


const ondown = (x, y) => {
    if (isAnimation) {
        return;
    }
    if (isGameover) {
        return;
    }
    flip(x, y);
    flip(x + 1, y);
    flip(x - 1, y);
    flip(x, y + 1);
    flip(x, y - 1);

    isGameover = board.flat().every((v) => v.color === 1);
    if (isGameover) {
        console.log("gameover")
        let message = document.getElementById("message")
        message.textContent = "クリア！！";
    }
}

window.onload = () => {
    init()
}