
var cards = ["queen","queen", "king", "king"];
var cardsInPlay = [];
var cardOne = cards[0];
var cardTwo = cards[2];
var choseTwo = false;
var match = false;

cardsInPlay.push(cardOne);
cardsInPlay.push(cardTwo);

if(cardsInPlay.length === 2){
	choseTwo = true;
	if(cardsInPlay[0] === cardsInPlay[1]){
		match = true;
		console.log("Found a Match!");
	} else {
		match = false;
		console.log("Sorry, Please Try Again"); 
	}
} else choseTwo = false;

console.log(cardsInPlay);
