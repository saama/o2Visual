(function() {
	"use strict";
	var _class = function(){

			var _self = this;
			
			// private 변수들은 여기 프로퍼티에 담음.
			var _prop = {
				prv : "test1"
			};
			
			// public 변수들은 여기 프로퍼티에 담음.
			_self.prop = {
				pbl : "test2"
			};
			
			/* singleton패턴
			 * canvas객체는 오직 한번만 만들어짐 
			 */
			_self.instance;
			_self.getInstance = function(){
				if(!self.instance){
					self.instance = init();
				}
				return self.instance;
			}
			
			function init(){
				var canvas = d3.select("#o2map").append("svg")
				return canvas;
			}

			function initialize() {
			}
			
			initialize();
	}
//	o2Visual.utils.sample()
	o2Visual.core = $.extend(o2Visual.core || {}, {
		map : _class
	});
})();