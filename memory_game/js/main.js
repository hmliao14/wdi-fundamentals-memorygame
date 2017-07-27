
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
  if (cardsInPlay[0] === cardsInPlay[1]) {
      console.log("You found a match!");
      console.log(" ");
  } else {
      console.log("Sorry, try again.");
      console.log(" ");
  }
};

var resetFlip = function() {
	for (var i = cardsInPlay.length - 1; i >= 0; i--) {
		cardsInPlay.pop();
	}
};

var flipCard = function(cardId){

	console.log("User flipped " + cards[cardId].rank 
		+ " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	if(cardsInPlay.length === 2){
		checkForMatch();
		resetFlip();
	}
};


flipCard(0);
flipCard(1);

flipCard(0);
flipCard(2);

flipCard(2);
flipCard(3);
