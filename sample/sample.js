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
	
	// This will be added to the docs auto-magically. No need for comment!
	published: {
		firstprop: "somedata",
		secondprop: "moredata"
	},
	
	/**
		Adds two numbers together
	**/
	addition: function(first, second){
		return first + second;
	},
	/**
		Divides numerator by denominator
	**/
	division: function(numerator, denominator){
		
	}
});