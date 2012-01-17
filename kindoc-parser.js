(function(){

	var regex = {
		func: /\/\*\*\s*([^\*]+)\*\*\/\s*(\w+):\s+function\(([\w, ]*)\)/gi,
		kind: /\/\*\*\s*([^\*]+)\*\*\/\s*enyo\.kind/gi,
		pubs: /\/\/\s+@public\s+published\s*:\s*\{\s+([^\{\}]+)\}/gi
	};

	// Remove empty strings from an array.
	var removeEmpty = function(arr){
		var i;
		for(i = 0; i < arr.length; i++){
			if(arr[i].match(/^\s*$/)){
				arr.splice(i, 1);
				i--;
			}
		}
		return arr;
	};
	
	// Truncate comment to remove head and tail
	var truncate = function(comment){
		return comment.replace(/\/\*\*\s+/gi, "").replace(/\s+\*\*\//gi, "");
	};
	
	// Returns an array of sections; each section is an array of strings.
	var toSections = function(comment){
		var sections = comment.trim().split(/\r\n[\t ]*\r\n/gi), i; /*.replace(/\t/gi, "")*/
		//console.log("TEST: " + comment.replace(/\r/gi, "\\r").replace(/\n/gi, "\\n"));
		//return;
		
		for(i = 0; i < sections.length; i++){
			sections[i] = removeEmpty(sections[i].split(/\r\n/gi));
		}
		return sections;
	};
	
	// Creates a Parser Kind object from a regex comment match
	var parseKind = function(comment){
		var lines = comment.split(/\n+/),
			secs  = toSections(comment),
			title = secs.shift().join("")
		;
		
		return { title: title, sections: secs };
	};
	
	// Creates a Parser Function object from a regex match
	var parseFunc = function(match){
		var name = match[2].trim(),
			args = match[3].trim(),
			comment = match[1], 
			lines = comment.split(/\n+/);
		
		return { 
			name: name, 
			sections: toSections(comment),
			args: args,
			index: match.index 
		};
	};
	
	// Creates a parser published object from a regex match
	var parsePublished = function(match){
		var propStrings = match[1].trim().split(/[ \t\r]+\n+[ \t]+/gi),
			arr, props = [], item= {}, i
		;
		for(i = 0; i < propStrings.length; i++){
			arr = propStrings[i].split(/\s*:\s*/gi);
			
			if(arr.length === 2){
				item[arr[0]] = arr[1];
			}
		}
		
		return item || null;
	};
	
	// MAIN PARSER FUNCTION 
	var parse = function(source){
		// local vars for parsing.
		var kinds = [], m, d, c = 0, current, next;
			// Iterates through kinds
			iterate = function(){ current = kinds[c]; next = kinds[c+1]; c++; };
		/*
			Parse kinds into an array.
		*/
		while(m = regex.kind.exec(source)) {
			d = parseKind(m[1]);
			d.index = m.index;
			kinds.push(d);
		}
		
		// Init utility function for iterating kinds.
		iterate();
		
		
		//Iterate through functions and add to kinds (keeping track
		//of kind iterator).
		while(m = regex.func.exec(source)) {
			var item = parseFunc(m);
			
			
			// If index of function is past end of current kind, move to next.
			while(next && m.index > next.index){ // Make sure kinds without functions are skipped over
				iterate();
			}
			
			// else, if current is set to a kind, add function to kind.
			if(current){
				if(current.funcs === undefined) { current.funcs = []; }
				current.funcs.push(item);
			}
		}
		c = 0;
		iterate();
		//Iterate through published and add to kinds.
		while(m = regex.pubs.exec(source)) {
			var obj = parsePublished(m);
			if(obj){
				// If index of function is past end of current kind, move to next.
				while(next && m.index > next.index){
					iterate();
				}
				// else, if current is set to a kind, add function to kind.
				if(current){
					current.pubs = obj;
				}
			}
		}
		
		// Log result for checking.
		//console.log(html.construct(arr));
		return kinds;
	};
	
	exports.parse = parse;
}());