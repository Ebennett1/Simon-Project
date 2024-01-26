
document.addEventListener('DOMContentLoaded', function () {

  // DOM elemenets essential for game
  const scoreDisplay = document.querySelector("#score")

  const startButton = document.querySelector(".startButton")

  const resetButton = document.querySelector(".resetButton")

  const gameContainer = document.querySelector(".game-container")
  


  // Game variables
  let score = 0;
  let gameSequence = [];
  let userSequence = [];
  let round = 1;
  // Tells wether computer is playing or not
  let isComputerPlaying = false;
  

  // Event listeners
  function addColorButtonListener(color, soundFunction) {
    // Adds event listeners for color buttons (green, red, yellow, blue).
    const button = document.querySelector(`#${color}`);
    // The listeners call handleButtonClick function only if the computer is not playing, and also play the corresponding sound.
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

  // Adds event listeners for start and reset buttons.
  startButton.addEventListener("click", () => {
    startGame();
  });

  // The start button triggers the startGame function, and the reset button triggers the resetGame function.

  resetButton.addEventListener("click", () => {
    resetGame();
  });

// game sound functions
// functions to play various sounds like winning, losing, and different color sounds.
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


// Computer sequence sounds
// a function (playColorSound) with a switch case to play a sound based on the color passed as an argument.
  function playColorSound(color) {
    switch (color) {
        case "green":
            playGreenSound();
            break;
        case "red":
            playRedSound();
            break;
        case "yellow":
            playYellowSound();
            break;
        case "blue":
            playBlueSound();
            break;
        
    }
}

// function to show messages on the screen.
// The showMessage function displays a message and optionally takes a callback to run when the user clicks the OK button.
  function showMessage(message, callback) {
    const messageContainer = document.getElementById('messageContainer');
    const messageText = document.getElementById('messageText');
    const okButton = document.getElementById('okButton');
  
    messageText.textContent = message;
    
    // Onclick function to clear display message when ok is pressed
      okButton.onclick = function () {
        messageContainer.style.display = 'none';
        if (callback) {
            callback();
        }
    };

    messageContainer.style.display = 'block';
  }

  // function to hide messages on the screen.
  function hideMessage() {
    // Retrieves the HTML element with the id 'messageContainer'.
    const messageContainer = document.getElementById('messageContainer');
    // Sets the display property of the messageContainer to 'none'. This CSS property controls the visibility of the element.
    messageContainer.style.display = 'none';
  }


  
  // Game logic functions
  // startGame function initializes the game, resets variables, and adds the first color to the sequence.
  function startGame() {
    // console.log("Game started");
     round = 1;
    resetGame();
    addToSequence();
  //  playSequence();
   updateScoreDisplay();
  }

  // resetGame function resets the game and updates the score display.
  function resetGame() {
    score = 0;
    gameSequence = [];
    userSequence = [];
    updateScoreDisplay();
  }

  // addToSequence adds a random color to the computer's sequence and plays the sequence. Using Math.floor/Math.random
  function addToSequence() {
    const buttons = ["green", "red", "yellow", "blue"];
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    gameSequence.push(randomButton);
    playSequence();
    
  }


  // playSequence iterates through the computer's sequence, highlights buttons, plays corresponding sounds, and enables buttons after the sequence is played.
  function playSequence() {
    // console.log("Playing sequence");
    isComputerPlaying = true;
    // Disables players ability to click
    disableButtons();

    // Initializes a variable i to keep track of the current index in the gameSequence array.
    let i = 0;

    // Sets up an interval using setInterval to repeatedly run the arrow function every 1000 milliseconds (1 second). The intervalId is a reference to this interval, allowing it to be cleared later.
    const intervalId = setInterval(() => {
      // Calls the highlightButton function to highlight the button corresponding to the current color in the sequence.
      highlightButton(gameSequence[i]);
      // Calls the playColorSound function to play the sounds that are in the current color in the sequence.
      playColorSound(gameSequence[i]);
      // Increments the index i to move to the next color in the sequence.
      i++;
      // Checks if all the colors in the sequence were played.
      if (i >= gameSequence.length) {
        // If true it Clears the interval, stopping the execution of the interval function.
        clearInterval(intervalId);
        // Sets a timeout to execute the arrow function after a delay of 600 milliseconds (0.6 seconds).
        setTimeout(() => {
          // Calls the enableButtons function to re-enable user input by adding the "active" class to the game container
          enableButtons();
          // Sets the isComputerPlaying flag to false, indicating that the computer has finished playing the sequence.
          isComputerPlaying = false;
      
        }, 600); // pause in between completing sequence and enabling input
      }
    }, 1000); // function executes every 1 sec.
  }

  // checks if the user's input is correct and updates the score.
  function checkPlayerInput() {
    // Calculates the index of the last element in the userSequence array.
    const lastIndex = userSequence.length - 1;
  
    // Compares the last element of the user's sequence with the corresponding element in the computer's sequence.
    if (userSequence[lastIndex] !== gameSequence[lastIndex]) {
      // Incorrect button pressed, game over
      endGame();
      // Returns false to indicate that the user's input was incorrect, and further processing should stop.
      return false;
      // Checks if the length of the user's sequence is equal to the length of the computer's sequence.
    } else if (userSequence.length === gameSequence.length) {
      // User completed the sequence
      score++;
      updateScoreDisplay();

      // Checks if the user's sequence is equal to the computer's sequence
      if (arraysEqual(userSequence, gameSequence)) {
        // function for the completion of the round
        endRound();
        // function to start the next round.
        playSequence();
      }
    }
    // indicates that the user's input was valid, and the game can proceed
    return true;
  }

  // handles user button clicks, checks the input, and proceeds to the next round or ends the game.
  function handleButtonClick(buttonColor) {
    // Adds the color of the clicked button to the userSequence array. This array keeps track of the sequence of colors that the user has clicked.
    userSequence.push(buttonColor);
    // Calls the checkPlayerInput function to validate the user's input
    if (!checkPlayerInput()) {
    //  if value of checkPlayerInput is false, then it Displays a message using showMessage indicating that the game is over because the user's sequence was incorrect.
      showMessage('Game Over! Your sequence was incorrect.');
      resetGame();
      // Checks if the length of the userSequence array is equal to the length of the gameSequence array, the condition is true when the user has completed their input for the current round.
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

  // enableButtons and disableButtons functions toggle the active class on the game container to enable or disable user input.

  function disableButtons() {
    gameContainer.classList.remove("active");
  }

  // highlightButton briefly changes the opacity of a button to provide visual feedback to user when it is part of the sequence.
  function highlightButton(color) {
    // Uses the document.getElementById method to retrieve the HTML element corresponding to the specified color.
    const button = document.getElementById(color);
    // Sets the opacity of the button to 0.3. This reduces the opacity of the button, making it visually appear dimmed or highlighted.
    button.style.opacity = 0.3;
    // Uses setTimeout to wait for a function to be executed after a delay of 600 milliseconds (0.6 seconds).
    setTimeout(() => {
      // Resets the opacity of the button to 1. This restores the button to its original, fully opaque state.
      button.style.opacity = 1;
    }, 600);
    // console.log('color')
  }

  // updates the displayed score on the UI
  function updateScoreDisplay() {
    // Updates the textContent property of the selected element with the current value of the score variable.
    scoreDisplay.textContent = score;
  }

  

  // Game logic functions (continued)
  // compares two arrays for equality.
  function arraysEqual(arr1, arr2) {
    // Converts the first array, arr1, and  the second array, arr2 to a JSON-formatted string and Compares the two JSON-formatted strings(userSequence & gameSequence) for strict equality. Meaning that not only the values but also the order of elements in the arrays must match for the comparison to be true.
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  // handles the end of each round, checks user input correctness, plays winning sound, and shows a message.
  function endRound(customMessage) {
    // Initializes a variable message with the value of customMessage if provided, or with a default message indicating the completion of the round and displaying the current score.
    const message = customMessage || `Round ${round} Complete! Your score is ${score}.`;

   
  
    // Checks if the user's sequence is correct by calling the arraysEqual function.
    if (!arraysEqual(userSequence, gameSequence)) {
      // Calls the showMessage function with a message indicating that the sequence was incorrect, and starts a new round.
      showMessage('Incorrect sequence! Starting a new round.');
      // Resets the round counter to 1.
      round = 1;
      resetGame();
    } else {
      // Calls the playWinningSound function to play a winning sound.
      playWinningSound();
      showMessage(message);
      userSequence = []; // Reset user sequence for the next round
      // Calls the addToSequence function to add a new color to the computer's sequence.
      addToSequence();
      // Sets a timeout to call the hideMessage function after a delay of 1500 milliseconds (1.5 seconds). This gives time for the user to see the completion message before it disappears.
      setTimeout(() => {
        // Removes display message from page
        hideMessage();
      }, 1500);
      // Increases round by 1
      round++;
    }
  }

  // displays the final score and plays a losing sound.
  function endGame() {
    // Calls the showMessage function with a message indicating that the game is over and showing the final score
    showMessage(`Game Over! Your score is ${score}.`);
    resetGame();
    // responsible for playing a sound associated with losing the game.
    playLoosingSound();
  }
});


// checklist - Complete README.md
// install- clone repository 
                

























