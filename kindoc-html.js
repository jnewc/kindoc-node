(function(){
	
	var Util = require("./kindoc-util.js").Util;
	
	var Html = function(){
		var str = "", titles = [];
		
		// -------------------- Utilities -------------------- //
		var add = function(s){ str += s + "\r\n"; };
		var reset = function(){ str = ""; titles = []; };
		
		var attrString = function(attr){
			var str = "", a;
			if(!attr){ return ""; }
			for(a in attr){
				if(attr.hasOwnProperty(a)){
					if(a === "className"){
						str += " class=\""+attr[a]+"\"";
					} else {
						str += " "+a+"=\""+attr[a]+"\"";
					}
				}
			}
			return str;
		};
		var closedTag = function(tag, attr){
			add("<"+tag+ " " + (attr?attrString(attr):"") + " />");
		};
		
		
		// -------------------- HTML tags -------------------- //
		this.tag = function(tag, attr, content){
			if(tag === "br" || tag === "hr" || tag === "link"){
				closedTag(tag, attr);
			} else {
				add(
					"<"+tag+" "+attrString(attr)+">"+content+"</"+tag+">"
				);
			}
		};
		this.div = function(content, attr){
			this.tag("div", attr, content);
		};
		this.br = function(){
			add("<br />");
		};
		this.hr = function(){
			add("<hr />");
		};
		this.p = function(content, attr){
			this.tag("p", attr, content);
		};
		this.header = function(title) {
			this.tag("h1", { id: title }, title);
			titles.push(title);
		};
		
		
		this.out = function(){
			return str;
		};
	
		// -------------------- OTHER -------------------- //
		this.toParagraph = function(section){
			if(this.isCode(section)){
				this.toCode(section);
			} else {
				this.p(section.join("<br />").replace("\t", "") || "");
			}
		};
		this.toCode = function(section){
			var i;
			var head = section.shift(), tail = section.pop(); // Lose tags <<< >>>
			
			var t = head.match(/(\t*)<<</)[1];
			
			add("<pre>" + (section.join("\r\n").replace(new RegExp(t, "g"), "") || "") + "</pre>");
		};
		this.isCode = function(section){
			if(section.length > 1){
				var start = section[0], end = section[section.length-1];
				if(typeof start === "string" && typeof end === "string" && 
				   start.trim() === "<<<" && end.trim() === ">>>"){
					return true;
				}
			}
			return false;
		};
		this.constructFuncs = function(funcs){
			if(funcs){
				var funchtml = "<h2>public functions</h2>";
				Util.each(funcs, function(f, i){
					Util.each(f.sections, function(sec, j) {
						if(typeof f.sections[j] === "object") { f.sections[j] = f.sections[j].join("\n"); }
						f.sections[j] = f.sections[j].replace(
							/\s\[(\w+)\]\s/gi, 
							" <span class=\"func-arg\">$1</span> "
						);
					});
					funchtml += "<div class=\"func\">\r\n";
					funchtml += "<h3>" + f.name + (f.args?" : <span>"+f.args+"</span>":"") + "</h3>\r\n";
					funchtml += "<p>" + f.sections.join("<br />") + "</p>\r\n";
					funchtml += "</div>\r\n";
				});
				add(funchtml);
			}
		};
		
		this.constructPubs = function(pubs){
			var pubshtml = "<h2>published properties</h2>" + 
				"<div class=\"pubs\">\r\n", 
				a
			;
			for(a in pubs) {
				pubshtml += "<p>" + a + ": " + pubs[a] + "</p>\r\n";
			}
			pubshtml += "</div>\r\n";
			add(pubshtml);
		};
		
		this.menu = function(){
			var html = "<div class=\"menu\">";
			if(!titles || titles.length === 0) { return null; }
			Util.each(titles, function(t, i){
				html += "<a href=\"#"+t+"\">"+t+"</a>";
			});
			html += "</div>";
			return html;
		};
	};	
	exports.HtmlBuilder = new Html();
	
}());