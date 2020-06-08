(function() {
	"use strict";
	var _class = function(){

			var _self = this;
			
			// private 변수들은 여기 프로퍼티에 담음.
			var _prop = {};
			
			// public 변수들은 여기 프로퍼티에 담음.		
			this.prop = {};

			function initialize() {
				_self.prop.initData1 = "test1";
				alert(_self.prop.initData1);
			}
			
			initialize();
	}
//	o2Visual.utils.sample()
	o2Visual.utils = $.extend(o2Visual.utils || {}, {
		sample : _class
	});
})();