
document.addEventListener('DOMContentLoaded', function () {
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
  let round = 1;
  let isComputerPlaying = false;

  // Event listeners
  function addColorButtonListener(color, soundFunction) {
    const button = document.querySelector(`#${color}`);
    button.addEventListener("click", () => {
      if (!isComputerPlaying) {
        handleButtonClick(color);
        soundFunction();
      }
    });
  }
  
  addColorButtonListener("green", playGreenSound);
  addColorButtonListener("red", playRedSound);
  addColorButtonListener("yellow", playYellowSound);
  addColorButtonListener("blue", playBlueSound);

  startButton.addEventListener("click", () => {
    startGame();
  });

  resetButton.addEventListener("click", () => {
    resetGame();
  });

// game sound functions
  function playWinningSound() {
    const winningSound = document.getElementById('winning');
    winningSound.play();
  }

  function playLoosingSound() {
    const loosingSound = document.getElementById('loosing');
    loosingSound.play();
  }

  function playGreenSound() {
    const greenSound = document.getElementById('greenSound');
    greenSound.play();
  }

  function playRedSound() {
    const redSound = document.getElementById('redSound');
    redSound.play();
  }

  function playYellowSound() {
    const yellowSound = document.getElementById('yellowSound');
    yellowSound.play();
  }
  
  function playBlueSound() {
    const blueSound = document.getElementById('blueSound');
    blueSound.play();
  }


  
  
  // Game logic functions
  function startGame() {
    // console.log("Game started");
     round = 1;
    resetGame();
    addToSequence();
  //  playSequence();
   updateScoreDisplay();
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
    // console.log("Playing sequence");
    isComputerPlaying = true;
    disableButtons();

    let i = 0;
    const intervalId = setInterval(() => {
      highlightButton(gameSequence[i]);
      i++;
      if (i >= gameSequence.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          enableButtons();
          isComputerPlaying = false;
        }, 500); 
      }
    }, 1000); 
  }

  function checkPlayerInput() {
    const lastIndex = userSequence.length - 1;
  
    if (userSequence[lastIndex] !== gameSequence[lastIndex]) {
      // Incorrect button pressed, game over
      endGame();
      return false;
    } else if (userSequence.length === gameSequence.length) {
      // User completed the sequence
      score++;
      updateScoreDisplay();

      if (arraysEqual(userSequence, gameSequence)) {
        endRound();
        playSequence();
      }
    }

    return true;
  }

  function handleButtonClick(buttonColor) {
    userSequence.push(buttonColor);
    if (!checkPlayerInput()) {
      alert('Game Over! Your sequence was incorrect.');
      resetGame();
    } else if (userSequence.length === gameSequence.length) {
      endRound(`Round ${round} Complete!`);
      round++;
      userSequence = [];
      addToSequence();
      setTimeout(() => {
        playSequence();
      }, 1000);
    }
  }

  function enableButtons() {
    gameContainer.classList.add("active");
  }

  function disableButtons() {
    gameContainer.classList.remove("active");
  }

  function highlightButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = 0.5;
    setTimeout(() => {
      button.style.opacity = 1;
    }, 500);
  }

  function updateScoreDisplay() {
    scoreDisplay.textContent = score;
  }

  

  // Game logic functions (continued)
  function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  function endRound(customMessage) {
    const message = customMessage || `Round ${round} Complete! Your score is ${score}.`;
    alert(message);
  
    // Check if the user's sequence is correct
    if (!arraysEqual(userSequence, gameSequence)) {
      
      alert('Incorrect sequence! Starting a new round.');
      round = 1;
      resetGame();
    } else {
      userSequence = []; // Reset user sequence for the next round
      addToSequence();
      setTimeout(() => {
        playSequence();
      }, 1000);
      round++;

      
    }
  }

  function endGame() {
    alert(`Game Over! Your score is ${score}.`);
    resetGame();
  }
});























