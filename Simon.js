// Selecting buttons using querySelector
const greenButton = document.querySelector("#green")
const redButton = document.querySelector("#red")
const yellowButton = document.querySelector("#yellow")
const blueButton = document.querySelector("#blue")

const scoreDisplay = document.querySelector("#score")

const startButton = document.querySelector(".startButton")
const resetButton = document.querySelector(".resetButton")

const gameContainer = document.querySelector(".game-container")


// Game variables
let score = 0;
let gameSequence = [];
let userSequence = [];

// Event listeners
greenButton.addEventListener("click", () => {
  handleButtonClick("green");
});

redButton.addEventListener("click", () => {
  handleButtonClick("red");
});

yellowButton.addEventListener("click", () => {
  handleButtonClick("yellow");
});

blueButton.addEventListener("click", () => {
  handleButtonClick("blue");
});

// Similar event listeners for other buttons

startButton.addEventListener("click", () => {
  startGame();
});

resetButton.addEventListener("click", () => {
  resetGame();
});

// Game logic functions
function startGame() {
  resetGame();
  addToSequence();
  updateScoreDisplay();
  playSequence();
}

function resetGame() {
  score = 0;
  gameSequence = [];
  userSequence = [];
  updateScoreDisplay();
}

function addToSequence() {
  const buttons = ["green", "red", "yellow", "blue"];
  const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  gameSequence.push(randomButton);
  playSequence();
}

function playSequence() {
  // Simulate the sequence by highlighting each button in order
  let i = 0;
  const intervalId = setInterval(() => {
    highlightButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(intervalId);
      enableUserInput();
    }
  }, 2000);
}

function handleButtonClick(buttonColor) {
  userSequence.push(buttonColor);
  checkUserInput();
  highlightButton(buttonColor);
}

function checkUserInput() {
  const lastIndex = userSequence.length - 1;

  // Check if the latest user input is incorrect
  if (userSequence[lastIndex] !== gameSequence[lastIndex]) {
    // Incorrect button pressed, game over
    endGame();
  } else if (userSequence.length === gameSequence.length) {
    // User completed the sequence
    if (arraysEqual(userSequence, gameSequence)) {
      // User input matches the sequence, increase score and continue
      score++;
      updateScoreDisplay();
      addToSequence();
    } else {
      // Incorrect sequence, game over
      endGame();
    }
  }
}

function enableUserInput() {
  // Enable user input for button clicks
  gameContainer.classList.add("active");
}

function disableUserInput() {
  // Disable user input during computer's turn
  gameContainer.classList.remove("active");
  gameContainer.classList.add("inactive");
}

function highlightButton(buttonColor) {
  // Simulate button highlight
  const button = document.querySelector(`#${buttonColor}`);
  button.classList.add("button-highlight");
  setTimeout(() => {
    button.classList.remove("button-highlight");
  }, 2000);
}

function updateScoreDisplay() {
  const scoreSpan = document.querySelector("#score");
  scoreSpan.textContent = score;
}

function endGame() {
  alert(`Game Over! Your score is ${score}.`);
  resetGame();
}


startGame();












