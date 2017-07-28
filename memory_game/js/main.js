
var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}

];
var cardsInPlay = [];

var checkForMatch = function(){
	/* added additional console log message and an 
	 * empty log message for easy debug purpose. 
	 * Alert requires acknowledgment before proceeding.
	 */ 
    if (cardsInPlay[0] === cardsInPlay[1]) {
      console.log("You found a match!");
      alert("You found a match!");
      console.log(" ");

    } else {
      console.log("Sorry, try again.");
      alert("Sorry, try again.");
      console.log(" ");
    }
};

/* This method somewhat ensure that the pair of cards 
 * flipped, or the two cards that we are compairing is 
 * always new. Else, flipping something like queen/king,
 * then king/queen, will result 2nd time to
 * be a match because king/king in 2nd flip and 3rd flip.
*/ 
var resetFlip = function() {
	for (var i = cardsInPlay.length - 1; i >= 0; i--) {
		cardsInPlay.pop();
	}
};

var flipCard = function(){
	// Additional log message on console for easy debug purposes
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank 
		+ " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src',cards[cardId].cardImage);
	if(cardsInPlay.length === 2){
		checkForMatch();
		resetFlip();
	}
};

var createBoard = function(argument) {
	// Create a loc variable makes easier to read
	// and easier to reference later.
	var loc = document.getElementById('game-board');
	var newElement;
	for (var i =0; i <cards.length; i++) {
		newElement = document.createElement('img');
		newElement.setAttribute('src',"images/back.png");
		newElement.setAttribute('data-id', i);
		newElement.addEventListener('click', flipCard)
		loc.appendChild(newElement);
	}
}

createBoard();
