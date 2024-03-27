'use strict';

// DOM Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const playerName0El = document.getElementById('name--0');
const playerName1El = document.getElementById('name--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//Global vars
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Functions

//1.Switch player
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

//2.Update the UI
const updateUI = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//3.Player wins
const playerWins = function () {
  playing = false;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
};

// player names
const playersNames = function () {
  const player0 = prompt('Enter the first player name', 'Player 1');
  const player1 = prompt('Enter the second player name', 'Player 2');

  playerName0El.textContent = player0;
  playerName1El.textContent = player1;
};

//4. New Game
const init = function () {
  //Reset vars
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Reset the UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  //Set the player names
  playersNames();
};

// Roll the dice
btnRollEl.addEventListener('click', function () {
  if (playing) {
    //1. Generate random dice number
    const randomDiceNum = Math.trunc(Math.random() * 6) + 1;

    //2. Set the dice number to randomDiceNum
    diceEl.src = `dice-${randomDiceNum}.png`;

    //3. Display dice number
    diceEl.classList.remove('hidden');

    //4. Check if the random number is equal or not to 1
    if (randomDiceNum !== 1) {
      //Add the random number to current score
      currentScore += randomDiceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Set the current score to Zero

      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      //Switch to another player
      switchPlayer();

      //Update the UI for active player
      updateUI();
    }
  }
});

//Hold
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    //1. Add the current score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if the total score of the active player after hold is equal to 100
    if (scores[activePlayer] >= 100) {
      playerWins();
      return;
    } else {
      //2. Reset the current score
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      //3.switch to another player
      switchPlayer();

      //4.Update UI
      updateUI();
    }
  }
});

//New game
btnNewEl.addEventListener('click', function () {
  //Remove the won background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //Update UI
  if (activePlayer === 1) {
    updateUI();
  }

  //Reset settings
  init();
});

//The entry point
init();
