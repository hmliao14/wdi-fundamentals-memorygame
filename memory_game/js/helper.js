// Helper.Js file that i created
// Will add more function as i create more reusable functions

/* randomInt: returns an array of (upperBound) amount of non duplicate integers. 
*/
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
			i++;
		}
	}
	return newArray;
}