let boxes = document.querySelectorAll(".play");
let resetBtn = document.querySelector(".reset-btn");
let playerAWinner = document.querySelector(".player-a-winner");
let playerBWinner = document.querySelector(".player-b-winner");
let playWithComputer = document.querySelector(".play-with-computer");
let draw = document.querySelector(".draw");
let playBtn = document.querySelector(".play-btn");
let container=document.querySelector(".container")
let player1Turn = true;
let gameMode="multiplayer"
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.disabled = true;
    if (gameMode === "computer" && !player1Turn) {
     player1Turn=true
    }

    if (player1Turn) {
      box.textContent = "X";
      player1Turn = false;
    } else if (gameMode === "multiplayer"&&!player1Turn) {
      box.textContent = "O";
      player1Turn = true;
    }
    checkWinner();
    if (gameMode === "computer") {
      computerTurn();
    }
    
  });
});

playBtn.addEventListener("click", () => {
  gameMode="multiplayer"
  playBtn.classList.add("hide")
  container.classList.remove("hide")
  resetBtn.classList.remove("hide")
  playWithComputer.classList.add("hide")
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  player1Turn = true;
  playerBWinner.classList.add("hide");
  playerAWinner.classList.add("hide");
  draw.classList.add("hide");
})


playWithComputer.addEventListener('click', () => {
  resetBtn.classList.remove("hide")
  container.classList.remove("hide")
  playBtn.classList.add("hide")
  playWithComputer.classList.add("hide")
  playerBWinner.classList.add("hide");
  playerAWinner.classList.add("hide");
  draw.classList.add("hide")
  gameMode = "computer";
  player1Turn = true;
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
})
function computerTurn() {
  let availableBoxes = [];
  boxes.forEach((box, index) => {
    if (!box.disabled) {
      availableBoxes.push(box);
    }
  })
  let computerTurnBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  computerTurnBox.textContent = "O";
  computerTurnBox.disabled = true;
  player1Turn = true;
  checkWinner();
}


resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  player1Turn = true;
});

function checkWinner() {
  let player1Boxes = [];
  let player2Boxes = [];
  let allBoxesFilled = 0;

  boxes.forEach((box, index) => {
      if (box.disabled) {
        allBoxesFilled++;
      }
      if (box.textContent === "X") {
        player1Boxes.push(index);
      } else if (box.textContent === "O") {
        player2Boxes.push(index);
      }
    });
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  

  for (let i = 0; i < winningCombinations.length; i++) {
    let [a, b, c] = winningCombinations[i];
    if (
      player1Boxes.includes(a) &&
      player1Boxes.includes(b) &&
      player1Boxes.includes(c)
    ) {
      boxes.forEach((box) => {
        box.disabled = true;
        playerAWinner.classList.remove("hide");
        resetBtn.classList.add("hide");
        playBtn.classList.remove("hide");
        playWithComputer.classList.remove("hide")
      })

      return;
    } 
    else if (
      player2Boxes.includes(a) &&
      player2Boxes.includes(b) &&
      player2Boxes.includes(c)
    ) {
      boxes.forEach((box) => {
        box.disabled = true;
        playerBWinner.classList.remove("hide");
        resetBtn.classList.add("hide");
        playBtn.classList.remove("hide");
        playWithComputer.classList.remove("hide")
      });
      return;
    }
  }
  if (
    allBoxesFilled == 9
  ) {
    draw.classList.remove("hide");
    resetBtn.classList.add("hide");
    playBtn.classList.remove("hide");
    playWithComputer.classList.remove("hide")
  }}
