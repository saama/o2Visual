(function() {
	"use strict";

	var jsPath = getScriptLocation("loader.js");
	console.log("jsPath "+jsPath)
	var files; 
	
	// css include
	files = LibFiles.CSS;
	for (var key in files) {
		var srcs = files[key];
		for (var idx in srcs) {
			document.write("<link rel='stylesheet' type='text/css' href='" + jsPath + srcs[idx] + "'>");
		}		
	}	
	
	// js include
	files = LibFiles.JS;
	for (var key in files) {
		var srcs = files[key];
		for (var idx in srcs) {
			document.write("<script src='" + jsPath + srcs[idx] + "'></script>");
		}
	}

	function getScriptLocation(scriptName) {
		console.log(scriptName)
		var regExp = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
		console.log(regExp)
		var scripts = document.getElementsByTagName("script");
		console.log(scripts)
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].getAttribute("src");
			console.log(src)
			if (src) {
				var match = src.match(regExp);
				if (match) {
					return match[1];
				}
			}
		}
		return null;
	}

})();
