const board = []
const xNos = 5;
const yNos = 5;
let level = 0;
let isGameover = false;
let isAnimation = false;
let isAuto = false;

// TODO:ソルバー作ってみる
// http://algopro.html.xdomain.jp/sflguide/sfl_g2/algo2.html

const init = () => {
    // const container = document.createElement("div");
    let container = document.getElementById("panels")
    let message = document.getElementById("message")
    // container.style.position = "relative";
    // container.id = "panels"
    document.body.appendChild(container);

    message.textContent = "すべての赤パネルを青にしよう！"
    createPanels(container)

}

const createPanels = (container) => {
    for (let y = 0; y < yNos; y++) {
        board[y] = [];
        for (let x = 0; x < xNos; x++) {
            // console.log(x, y)
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

const flip = async (x, y) => {
    if (x < 0 || y < 0 || x >= xNos || y >= yNos) {
        return;
    }
    isAnimation = true;
    const panel = board[y][x].panel;
    let color = board[y][x].color;
    color = 1 - color;
    board[y][x].color = color;

    if (!isAuto) {
        panel.style.transform = "perspective(150px) rotateY(90deg)";
        await new Promise(r => setTimeout(r, 150));
        panel.style.backgroundColor = color ? "#00f" : "#f00";

        panel.style.transform = "perspective(150px) rotateY(-90deg)"
        panel.parentElement.appendChild(panel)
        await new Promise(r => setTimeout(r, 50));
        panel.style.backgroundColor = color ? "#00f" : "#f00";
        panel.style.transform = "perspective(150px) rotateY(0deg)"
        await new Promise(r => setTimeout(r, 150));
    } else {
        panel.style.backgroundColor = color ? "#00f" : "#f00";
    }

    isAnimation = false;
}

const randomTap = async () => {
    // ランダムにどこかをクリックして、それをたくさん繰り返せばいずれ正解になる、という荒業
    await new Promise(r => setTimeout(r, 500));
    tapY = Math.trunc(Math.random() * xNos);
    tapX = Math.trunc(Math.random() * yNos);
    console.log("random", tapX, tapY)
    isAuto = true;
    ondown(tapX, tapY)
    // flip(tapX, tapY)
    // flip(tapX + 1, tapY);
    // flip(tapX - 1, tapY);
    // flip(tapX, tapY + 1);
    // flip(tapX, tapY - 1);
    isAuto = false;

}

const clearPanels = () => {
    // まずまっさらにする
    panels = document.getElementById("panels");
    while (panels.lastChild) {
        panels.removeChild(panels.lastChild);
    }

}

function autoAnswer() {
    // ランダムにどこかをタップするのを繰り返す。アニメーションなし
    isAuto = true;
    for (let i = 0; i < 1000; i++) {
        randomTap()
    }
    // while (!isGameover) {
    //     randomTap()
    // }
    isAuto = false;
}

function autoAnswer2() {
    isAuto = true;
    for (let y = 1; y < yNos; y++) {
        for (let x = 0; x < xNos; x++) {
            // 1つ上のパネルが赤なら、パネルをクリックする（そして1つ上のパネルを青にする）
            const upPanel = board[y - 1][x].panel;
            let upColor = board[y - 1][x].color;
            if (upColor === 0) {
                ondown(x, y)
            }
        }
    }
    isAuto = false;
}

const showAnswers = () => {
    let answerContainer = document.createElement("answerContainer");
    document.body.appendChild(answerContainer);

    for (let topX = 0; topX < xNos; topX++) {
        let answerBoard = []
        let div = document.createElement("div")
        answerContainer.appendChild(div);
        div.style.border = `4px solid`;
        div.style.height = `500px`;
        div.style.width = `500px`;
        div.style.left = `500px`;
        div.style.top = `500px`;
        div.style.position = "relative"
        // for (let y = 0; y < yNos; y++) {
        //     answerBoard[y] = [];
        //     for (let x = 0; x < xNos; x++) {
        //         console.log(topX, x, y)
        //         const panel = document.createElement("div");
        //         panel.style.position = `absolute`;
        //         panel.style.left = `${x * 100 + 2}px`;
        //         panel.style.top = `${y * 100 + 20 + (topX + 1) * xNos * 100}px`;
        //         panel.style.width = `96px`;
        //         panel.style.height = `96px`;
        //         panel.style.backgroundColor = `#ff0`;
        //         panel.style.borderRadius = `10px`;

        //         panel.style.transition = `all 150ms linear`;
        //         answerContainer.appendChild(panel);

        //         answerBoard[y][x] = { panel, color: 0 };
        //     }
        // }
        // for (let c0 = 0; c0 <= 1; c0++) {
        //     for (let c1 = 0; c1 <= 1; c1++) {
        //         for (let c2 = 0; c2 <= 1; c2++) {
        //             for (let c3 = 0; c3 <= 1; c3++) {
        //                 for (let c4 = 0; c4 <= 1; c4++) {
        //                     let div = document.createElement("div")
        //                     answerContainer.appendChild(div);
        //                     createPanels(div)
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}


const gameover = async () => {
    console.log("gameover")
    let message = document.getElementById("message")
    message.textContent = "クリア！！";
    await new Promise(r => setTimeout(r, 1500));
    level += 1;
    message.textContent = "すべての赤パネルを青にしよう！"

    // TODO:container要素を消去する
    clearPanels();
    init();
    // randomTap(1)
    for (i = 0; i <= level; i++) {
        randomTap(i)
    }
    isGameover = false;
}


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
        gameover();
    }
}

window.onload = () => {
    init()
}