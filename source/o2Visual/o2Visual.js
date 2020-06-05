(function() {
	"use strict";
	
	window.o2Visual = {
		version: "1.0.0"
	}
	o2Visual.test = function(option) {
	    alert("TEST");
	}
	function getScriptLocation(scriptName) {
		var regExp = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
//			var src = scripts[i].getAttribute("src");
			var src = scripts[i].src.split(location.origin)[1];
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