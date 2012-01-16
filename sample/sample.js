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
	
	published: {
		pubprop: "someprop"
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