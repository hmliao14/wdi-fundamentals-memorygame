
//var numCards = 16;

var cards = [
	{
		key: "heartQueen",
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		key: "diamondQueen",
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		key: "heartKing",
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		key: "diamondKing",
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
      //alert("You found a match!");
      console.log(" ");

    } else {
      console.log("Sorry, try again.");
      //alert("Sorry, try again.");
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

// My own addition of function
var randomInt = function(upperBound) {
	var i =0;
	var newIndex =0;
	var insert;
	var newArray = [];
	while(i < upperBound) {
		insert = true;
		newIndex = Math.floor(Math.random()*upperBound);
		for(var k =0; k < upperBound; k++){
			// if any newly generated index is alrdy in the
			// array, we will not push to the array.
			if(newArray[k] === newIndex){
				insert = false;
			}
		}
		if(insert) {
			newArray.push(newIndex);
/*			console.log("j:" + j + " " + "tempArrayObjIndex:" + 
				tempArrayObj[j].index);
*/			i++;
		}
	}
	return newArray;
}


var createBoard = function() {
	// Create a loc variable makes easier to read
	// and easier to reference later.
	var loc = document.getElementById('game-board');
	var newElement;
	var randomIndex = randomInt(4);
	var j = 0;
	var boardSize = 8;

	for (var i =0; i < boardSize; i++) {
		newElement = document.createElement('img');
		newElement.setAttribute('src',"images/back.png");
		// in this line, randomize a integer betwen
		// 1-4 and then assign to data-id, rather than
		// static i integer being asssigned:
		if(i%4 === 0) {
			randomIndex = randomInt(4);
			j = 0;
		}
		newElement.setAttribute('data-id', randomIndex[j]);
		newElement.addEventListener('click', flipCard);
		loc.appendChild(newElement);
		j++;
	}
};


// All code after this line are my own addition.
/*var startAlert = function() {
	createBoard();
};*/

var shuffle = function(someArray) {
	var newArray= [];
	var tempArrayObj = [];
	var tempObject = {};


	for(var i = 0; i < someArray.length; i++){
		//= Math.ceil(Math.random)
		tempObject = {};
		tempObject.index = i;
		tempObject.content = someArray[i];
		tempArrayObj.push(tempObject);
	}
	// One way to check if an array is shuffled if any of the
	// index has been shifted from original array
	// First will append each object random into an array
	// then do check
	var j = 0;
	var newIndex = 0;
	var arrayCheck = [];
	var insert;
	while(j < tempArrayObj.length){
		// set and reset insert flag
		insert = true;
		newIndex = Math.floor(Math.random()*tempArrayObj.length);
		for(var k =0; k < tempArrayObj.length; k++){
			// if any newly generated index is alrdy in the
			// array, we will not push to the array.
			if(arrayCheck[k] === newIndex){
				insert = false;
			}
		}
		if(insert) {
			arrayCheck.push(newIndex);
/*			console.log("j:" + j + " " + "tempArrayObjIndex:" + 
				tempArrayObj[j].index);
*/			j++;
		}
		//j++; // here for now so program dont crash...
	}

	for(var i=0; i <tempArrayObj.length; i++) {
		for(var k =0; k < arrayCheck.length; k++) {
			if(tempArrayObj[k].index === arrayCheck[i]) {
				newArray[i] = tempArrayObj[k].content;
			}
		}
	}


	console.log(arrayCheck);
	console.log(newArray);
}

var resetBoard = function() {
	var childs = document.getElementById('game-board').childNodes;
	//console.log(cards[0]);

	var parent = document.getElementById('game-board');
	//console.log(cards[0]);
	var k = childs.length;
	for (var i=0; i < k; i++){
		parent.removeChild(childs[0]);
		//childs.remove();
	}
	//var array = ['zero', 'one','two','three', 'four'];
	//shuffle(array);
	// Until createBoard is fully randomized,
	// create board should go here:
	createBoard();
};

var startButton = document.getElementById('startGame');
startButton.addEventListener('click', createBoard);

var resetButton = document.getElementById('resetGame');
resetButton.addEventListener('click', resetBoard);

console.log(randomInt(10));
