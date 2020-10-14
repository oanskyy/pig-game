/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// instead of creating two variables for score1 and score1 we will create an array that will hold both scores, in order to keep things clear. 
// declare variables here and can define somewhere else
let scores, roundScore, activePlayer, gamePlaying;

init(); 
let previousDice;


// Set up EVENT Handlers
document.querySelector('.btn-roll').addEventListener('click', function() { 
  if(gamePlaying) { 
      // 1. Random number 
      let dice = Math.floor(Math.random() * 6) + 1; 

      // 2. Display the result 
      let diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block'; 
      diceDOM.src = 'dice-' + dice + '.png';

      // 3. Update the round score IF the rolled number was NOT a 1
      if(dice === 6 && previousDice === 6) { 
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
      } else if (dice !== 1) { 
        // Add score
        roundScore += dice; 
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else { 
        // Next player
        nextPlayer();
      }
      previousDice = dice;
    }  
});


document.querySelector('.btn-hold').addEventListener('click', function() { 
  if (gamePlaying) { 
    // Add current score to global score 
    scores[activePlayer] += roundScore; 

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    let winningScore; 
    if(input) { 
      winningScore = input; 
    } else { 
      winningScore = 100; 
    }

    // Check if player won the game 
    if (scores[activePlayer] >= winningScore) { 
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
      gamePlaying = false; 
    } else { 
      // Next player 
      nextPlayer();
    }
  }
  
});


function nextPlayer() { 
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init)
function init() { 
  // define variables here
  scores = [0,0]; 
  roundScore = 0;
  activePlayer = 0; 
  gamePlaying = true;

  // Change CSS styles
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

