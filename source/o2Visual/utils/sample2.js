(function() {
	"use strict";
	var _class = {

			initialize : function(val) {
				alert(val);
			}
	}
//	o2Visual.utils.sample2.initialize("test")
	o2Visual.utils = $.extend(o2Visual.utils || {}, {
		sample2 : _class
	});
})();