let gameseq = [];
let userseq = [];
let color = ["red", "green", "yellow", "blue"];
let start = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector("h2");

let st =document.querySelector("#start");
function reset() {
    gameseq = [];
    userseq = [];
    start = false;
    highscore = Math.max(highscore, level);
    level = 0;
    let p = document.querySelector("p");
    p.innerHTML = `<b>High Score: ${highscore}</b>`;
}

st.addEventListener("click", function() {
    if (start == false) {
        console.log("game is start!");
        start = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userseq = []; // Reset user sequence
    level++;
    highscore = Math.max(highscore, level);
    h2.innerText = `level ${level}`;
    let ranidx = Math.floor(Math.random() * 4); // Fixed: now includes all 4 colors
    let rancolor = color[ranidx];
    let ranbtn = document.querySelector(`.${rancolor}`);
    gameseq.push(rancolor); // Moved this here to add to sequence
    setTimeout(() => {
        btnflash(ranbtn);
    }, 250);
}

function check(idx) {
    if (gameseq[idx] === userseq[idx]) {
        if (gameseq.length == userseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score is <b>${level}</b><br/>Press Start to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    if (!start) return;
    let btn = this;
    btnflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    check(userseq.length - 1);
}

let buttons = document.querySelectorAll(".btn");
for (btn of buttons) {
    btn.addEventListener("click", btnPress);
}
