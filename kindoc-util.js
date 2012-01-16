(function(){
	
	exports.Util = {
		each: function(items, func){
			var i;
			for(i = 0; i < items.length; i++){
				func(items[i], i);
			}
		},
		log: function(obj){
			var msg = "";
			if(typeof obj === "object"){
				try {
					msg += JSON.stringify(obj);
				} catch(e){
					msg += obj.toString();
				}
			}
			else if(typeof obj === "string"){
				msg += obj;
			}
			
			console.log(msg);
		},
		error: function(msg){
			throw "ERROR: " + msg;
		}
	};
}());