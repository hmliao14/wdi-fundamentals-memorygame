var cards = [
	{
		suitRank: "heartQueen",
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		suitRank: "diamondQueen",
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		suitRank: "heartKing",
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		suitRank: "diamondKing",
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}

];
var cardsInPlay = [];
var gameStarted = false;
var playerScore = 0;
var boardSize = 16;
var bestRecord = 0;
var index = 0;
var timer = new stopwatch('timer');
var announceElement = document.querySelector('.announcement');
var bestRecordEle = document.querySelector('.highestRecord');

// This is a function that I modified from stopwatch2.js to 
// take into a output time from stopwatch2.js's currentTime() and revert
// back to it. E.g. timer.currentTime() output the current time in
// 850500 is equal to 850 seconds and 500 millseconds. I added currentTime()
// and formatT() so i can compare the end of game time to the best record time.
// Please note that the stopwatch2.js is taken from an online source with 
// free to use license. Please look at stopwatch2.js for original detailed message.
var formatT = function(num) {
	var h, m, s, ms;
	var strTime = '\'' + num + '\'';

	function pad(number, size) {
	    var s = "0000" + String(number)
	    return s.substr(s.length - size)
	}

	h = Math.floor( num / (60 * 60 * 1000) );
	m = Math.floor( num / (60 * 1000) % 60);
	s = Math.floor( num / 1000 % 60 );
	ms = num % 1000 / 10
	return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 2)
}

var checkForMatch = function(){
	// If the user have not clicked two cards, then we exit
	// The recent second and fourth element represent the cards' suit&&rank
	if(cardsInPlay[index+1]===undefined || 
		cardsInPlay[index+3]===undefined) {
		return;
	}
	// score and card element are html locations to be updated.
	// first and second ID are css selector identifier for those html elements
	// timeOutID is parameter used to objects associated with timeout
	// first/second card id are CSS selector referencing the specific card clicped
	// for updating purposes
	var scoreElement = document.querySelector('.score');
	var cardElement;
	var timeOutID;
	var milSec = 500;
	var firstCardID = '[data-id=\"' + cardsInPlay[index] + '\"]';
	var secondCardID = '[data-id=\"' + cardsInPlay[index+2] + '\"]';
	// compare the cards' suiRank to see if its a match
	// if its a match, we display the "Match" msg for 1second and update the
	// score on screen. Increase the index so next pair of cards flipped will be
	// compared appropriately
    if (cardsInPlay[index+1] === cardsInPlay[index+3]) {
    	announceElement.textContent = "You found a match!";
    	timeOutID = setTimeout(eraseAnnounce, milSec);
    	playerScore++;
    	scoreElement.innerHTML =  "You Score: " + playerScore;
    	index = index + 4;  
    	// For boardSize of 16 cards, total of 8 (16/2) pairs can be made.
    	// This is where player matched all possible pairs. Now we
    	// stop the timer, clear the object, update best record, and display
    	// approximate msg and record on the screen.
    	if(playerScore*2 === boardSize) { 
    		timer.stop();
    		clearTimeout(timeOutID); 
    		if(timer.currentTime() < bestRecord || bestRecord === 0) {
    			bestRecord = timer.currentTime();
    			alert("New Record! " + formatT(bestRecord));
    		}
    		bestRecordEle.textContent = "Best Record: " + formatT(bestRecord);
    		announceElement.textContent = "Good Game!";
    	}
    } else {
    	// If no match, reset the clicked images to facedown
    	// and pop out the two cards' ID and suitRank in the array 
    	// so user can click them again
    	announceElement.textContent = "Sorry, try again.";
    	timeOutID = setTimeout(eraseAnnounce, milSec);
    	setTimeout(faceDown, milSec, firstCardID);
    	setTimeout(faceDown, milSec, secondCardID);
    	for(var i = 0; i<4; i++) {
      		cardsInPlay.pop();
      	}
    }
    function eraseAnnounce(){
    	announceElement.textContent = " ";
    }
    function faceDown(id) {
    	cardElement = document.querySelector(id);
    	cardElement.setAttribute('src', "images/back.png");
    }
};

// cardId is the unique identifier for the specific card clicked
// used to check if player clicking the same card
// cardType is the # identifier for the card type suit&&rank that
// player clicked. It is used for check if flipped card one === two
var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	var cardType = this.getAttribute('data-card-type');
	// Check if the card is already flipped by checking its id to 
	// the card id thats already flipped in the array
	// If flipped, exit, else we push into array to compare
	for(var i = 0; i < cardsInPlay.length; i ++) {
		if(cardId === cardsInPlay[i] || cardId === cardsInPlay[i+2]){
			return;
		}
	}
	// Push the cardId and the card's suit/rank 
	// into 1st and 2nd element
	cardsInPlay.push(cardId, cards[cardType].suitRank);
	this.setAttribute('src',cards[cardType].cardImage);
	// Rather than checking cardinPlay length is greater than 2,
	// I let checkForMatch to check if two cards flipe are empty
	// to proceed next stage because cardInPlay array is always
	// increasing.
	checkForMatch();
};

// create dynatmic img element and assign a data-card-type
// between 1-4, heartQueen, diamondQueen, heartKing, diamondKing
// data-id is the unique id assigned to each card HTML element
// for changing its images and comparing cards in play
var createBoard = function() {
	var boardElement = document.getElementById('game-board');
	var newElement;
	var randomIndex = randomInt(4);
	var j = 0;
	for (var i =0; i < boardSize; i++) {
		newElement = document.createElement('img');
		newElement.setAttribute('src',"images/back.png");
		if(i%4 === 0) {
			randomIndex = randomInt(4);
			j = 0;
		}
		newElement.setAttribute('data-card-type', randomIndex[j]);
		newElement.setAttribute('data-id', i);
		newElement.addEventListener('click', flipCard);
		boardElement.appendChild(newElement);
		j++;
	}
};

// load all the variables and start timer
// createBoard, checkforMatch, check for game state, and display result
var startGame = function() {
	if (gameStarted) {
		return;
	}
	gameStarted = true;
	timer.start();
	createBoard();
}

// Delete all card elements in the DOM and cards played last game
// Reset relevant global variables and timer
var resetGame = function() {
	var childs = document.getElementById('game-board').childNodes;
	var scoreElement = document.querySelector('.score');
	var k = childs.length;
	for (var i=0; i < k; i++){
		childs[0].remove();
	}
	for (var i = cardsInPlay.length - 1; i >= 0; i--) {
		cardsInPlay.pop();
	}
	index = 0 ;
	playerScore = 0;
	gameStarted = false;
	timer.reset();
	announceElement.innerHTML = " ";
	scoreElement.innerHTML =  "Your Score: " + playerScore;
};

var startButton = document.getElementById('startGame');
startButton.addEventListener('click', startGame);

var resetButton = document.getElementById('resetGame');
resetButton.addEventListener('click', resetGame);
