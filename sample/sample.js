/**
	Arithmetic
	
	Contains a number of utility functions for performing
	basic arithmetic.
	
	Example usage:
	
		<<<
			var arithmetic = new Arithmetic();
			arithmetic.addition(5, 7); // 12
			arithmetic.division(12, 4); // 3
		>>>
**/
enyo.kind({
	name: "Arithmetic",

	// @public
	published: {
		firstprop: "somedata",
		secondprop: "moredata"
	},
	
	/**
		Adds the two numbers [first] and [second] together
		and returns the result.
	**/
	addition: function(first, second){
		return first + second;
	},
	/**
		Divides [numerator] by [denominator] and returns
		the result.
	**/
	division: function(numerator, denominator){
		
	}
});