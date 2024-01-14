// Selecting buttons using querySelector
const greenButtn = document.querySelector('#green')
const redButtn = document.querySelector('#red')
const yellowButtn = document.querySelector('#yellow')
const blueButtn = document.querySelector('#blue')

let sequence = [];
let playerSequence = [];
const colors = ['green', 'red', 'yellow', 'blue'];
let level = 1

// Function to start the game
const startGame = function() {
//   randomSequence();
// console.log(sequence);
// displaySequence();

}

// Function to generate a random sequence
const randomSequence = function() {
  sequence = [];
 for (let i = 0; i < level; i++) {
        const randomColor = colors[Math.floor(Math.random() * 4)];
        sequence.push(randomColor);
    }
}
// randomSequence();
// console.log(sequence)

// const displaySequence = function () {
//   let i = 0;
//   const delay = setInterval(() => {
//     flashButton(sequence[i]);
//     i++;
//     if (i === sequence.length) {
//       clearInterval(delay);
//       acceptPlayerInput();
//     }
//   }, 1000);
// }

// const flashButton = function(color) {
//   const button = document.querySelector(`.${color}`);
//   return new Promise((resolve) => {
//     button.classList.add('active');
//     setTimeout(() => {
//       button.classList.remove('active');
//       resolve();
//     }, 1000);
//   });
// }


// const acceptPlayerInput = function() {
//   // Add event listeners for button clicks
//   greenButtn.addEventListener('click', handleButtonClick);
//   redButtn.addEventListener('click', handleButtonClick);
//   yellowButtn.addEventListener('click', handleButtonClick);
//   blueButtn.addEventListener('click', handleButtonClick);
// }




// startGame();



