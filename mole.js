let moleTile;
let lastMoleTile;
let piranhaTile;
let lastPiranhaTile;
let score = 0;
let canScore = true;
let gameOver = false;
let scr = document.querySelector("#score");
let over = document.querySelector("#over");
let h1 = document.querySelector("#h");
let board = document.querySelector("#board");
let body = document.querySelector("body");
let restart = document.querySelector("#btn1");
let totalScore = document.querySelector("h2");
let moleInterval;
let PiranhaInterval;

window.onload = function () {
  game();
};

function resetGame() {
  score = 0;
  scr.innerText = score.toString();
  over.style.display = "none";
  h1.style.display = "block";
  scr.style.display = "block";
  board.style.display = "block";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.transform = "";
  board.style.display = "flex";
  board.style.flexWrap = "wrap";
  board.innerHTML = "";
  score.innerText = "0";

  game();
}

function game() {
  for (let i = 0; i < 9; i++) {
    let grid = document.createElement("div");
    grid.id = i.toString();
    grid.addEventListener("click", selectTile);
    board.appendChild(grid);
  }

  clearInterval(moleInterval);
  clearInterval(PiranhaInterval);

  moleInterval = setInterval(setMoleTile, 1000);
  PiranhaInterval = setInterval(setPiranhaTile, 2000);
}

function selectTile() {
  if (this == moleTile) {
    score += 1;
    scr.innerText = score.toString();
    totalScore.innerText = "your score: " + scr.innerText;
  } else if (this == piranhaTile) {
    over.style.display = "block";
    h1.style.display = "none";
    scr.style.display = "none";
    board.style.display = "none";
    body.style.position = "absolute";
    body.style.top = "50%";
    body.style.left = "50%";
    body.style.transform = "translate(-50%, -50%)";
  }
}

function randomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMoleTile() {
  if (moleTile) {
    moleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./ASSETS/monty-mole.png";

  let num = randomTile();
  if (piranhaTile && piranhaTile.id == num) {
    lastPiranhaTile = num;
    return;
  }
  moleTile = document.getElementById(num);
  moleTile.appendChild(mole);
}

function setPiranhaTile() {
  if (piranhaTile) {
    piranhaTile.innerHTML = "";
  }

  let piranha = document.createElement("img");
  piranha.src = "./ASSETS/piranha-plant.png";

  let num = randomTile();
  if (moleTile && moleTile.id == num) {
    lastMoleTile = num;
    return;
  }
  piranhaTile = document.getElementById(num);
  piranhaTile.appendChild(piranha);
}

restart.addEventListener("click", resetGame);
