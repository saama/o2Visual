(function() {
	"use strict";
	var _class = function(){
			function initialize() {
			    var canvas = d3.select("#o2map").append("svg")
		         .attr("width",500)
		         .attr("height",500)
		         .style("background-color","yellow")
		           .on("click", circleDrawing);

		      function circleDrawing() {
		          var mouseXY = d3.mouse(this);

		          var circle = canvas.append("circle")
		               .attr("cx",mouseXY[0]) //시작위치
		               .attr("cy",mouseXY[1])
		               .attr("r",10)    
		               .attr("fill", d3.hsl((Math.random()*1000 % 360), 1, 0.5))
		               .transition()
		                 .duration(3000)
		                 .ease(Math.sqrt)
		                 .attr("cx",500/2)
		                 .attr("cy",500/2)
		                 .attr("r", 100)                 
		                 .remove();                      
		      }
			}
			initialize();
	}
//	o2Visual.utils.sample3()
	o2Visual.utils = $.extend(o2Visual.utils || {}, {
		sample3 : _class
	});
})();