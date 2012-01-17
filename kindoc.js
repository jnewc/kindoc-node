// ============================== HEADER ============================== //
var Util   = require("./kindoc-util.js").Util;
var Html   = require("./kindoc-html.js").HtmlBuilder;
var Loader = require("./kindoc-loader.js").Loader;
var parse  = require("./kindoc-parser.js").parse;

// ============================== INIT ============================== //
var dirpath, paths, html = "";

// [0]: Error checking
if(!process.argv || !process.argv[2]){
	Util.error("Missing arguments.");
}

// [1]: Use Loader to get all javascript file paths.
dirpath = process.argv[2]; // Get dirpath from command-line argument.
paths = Loader.paths(dirpath); // Load all javascript paths in directory.

// [2]: Parse files.
var kinds = parse(Loader.source(paths));
Util.each(kinds, function(k, i){
	//Set title
	Html.header(k.title);
	//Parse sections
	Util.each(k.sections, function(sec, j){
		if(sec && sec.length && sec.length > 0) { 
			Html.toParagraph(sec);
		}
	});
	
	// Parse published
	if(k.pubs){
		Html.constructPubs(k.pubs);
	}
	
	// Parse functions
	Html.constructFuncs(k.funcs);
	
	// Footer
	Html.footer("", true);
	
});
// [3]: Output 
console.log(
	Loader.template({

		title: "Enyo Docs",  
		body: Html.out(),
		menu: Html.menu()
	})
);

