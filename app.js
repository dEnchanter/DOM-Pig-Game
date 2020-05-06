/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

the process hwereby we make javascript interact with the webpage is called DOM Manipulation 
*/

// generating random number between 1 & 6
// dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

// manipulating the DOM
// text content is used to dynamically change only the text content of an html element
// document.querySelector('#current-' + activePlayer).textContent = dice;

// innerHTML is used to set the html content along with its text
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// query selector can be used to set a value AKA setter as above or read a value AKA getter as shown below
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//adding event listener
// function btn() {
//     //do something
// }
//document.querySelector('.btn-roll').addEventListener('click', btn);
//note: here the btn function is called without its parenthesis bcus it is a callback function
// a function that is not called by us but by another function or a function that is passed into another function
// as a argument

var scores, roundScore, activePlayer, gamePlaying;

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;
init();
var lastDice;

// we can also use the query selector to change the css of some element
// document.querySelector(".dice").style.display = "none";

// //another way to manipulate the dom
// document.getElementById("score-0").textContent = "0";
// document.getElementById("score-1").textContent = "0";
// document.getElementById("current-0").textContent = "0";
// document.getElementById("current-1").textContent = "0";

/******ALSO */
document.querySelector(".btn-roll").addEventListener("click", function() {
  //do something
  //this is called an anonymous funtion and can be used if we dont want to use the callback syntax of declaring
  //a function and calling it as a callback
  //anonymous function doesn't have a name and we can't use it outside of this context

  if (gamePlaying) {
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was not 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else if(lastDice === 6 && dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = '0';
      nextPlayer();
    } else {
      //Next player
      nextPlayer();
    }
    
    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to Global score
    scores[activePlayer] += roundScore;
    console.log(scores[activePlayer]);

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  //another way to manipulate the dom
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
