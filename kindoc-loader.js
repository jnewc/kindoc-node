(function(){

	// Headers
	var fs   = require('fs');
	var Util = require("./kindoc-util.js").Util;

	// @Private
	var jspaths;
	
	// @EXPORT
	var Loader = {
		paths: function(dirpath){
			jspaths = [];
			var getpaths = function(path){
				var ls = fs.readdirSync(path), i, newpath;
				for(i = 0; i < ls.length; i++){
					newpath = path + "/" + ls[i];
					if(ls[i].match(/^\w+\.js$/)){
						jspaths.push(newpath);
					} 
					else if(
						ls[i][0] !== "." && 
						ls[i] !== "enyo" &&
						fs.statSync(newpath).isDirectory()
					){
						getpaths(newpath);
					}
				}
			};	
			getpaths(dirpath);
			
			return jspaths;
		},
		each: function(func){
			Util.each(jspaths, func);
		},
		
		template: function(args){
			var template = fs.readFileSync("template.html", "utf8");
			if(args.body){
				template = template.replace("${BODY}",  args.body);
			}
			if(args.title){
				template = template.replace("${TITLE}", args.title);
			}
			if(args.menu){
				template = template.replace("${MENU}",  args.menu);
			}
			return template;
		},
		source: function(jspaths){
			var out = "", source, i;
			for(i = 0; i < jspaths.length; i++){
				source = fs.readFileSync(jspaths[i], 'utf8');
				out += source + "\r\n";
			}
			return out;
		}
	};
	
	exports.Loader = Loader;
	
}());