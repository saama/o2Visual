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

			var init00 = null;
			var init11 = null;
			var initScale = null;
			var curr00 = null;
			var rescale = null;
			var map = o2.$.map;
			
			/* singleton패턴
			 * canvas객체는 오직 한번만 만들어짐 
			 */
			_self.instance;
			_self.getInstance = function(){
				if(!_self.instance){
					_self.instance = init();
				}
				return _self.instance;
			}
			
			function init(){

				var canvas = d3.select('#o2map .ol-viewport')
					.insert('div').classed('d3-layer', true) //div before gui for gui to work
					.style('position', 'absolute')
					.style('top', '0px')
					.style('left', '0px')
					.style('width', '100%')
					.style('height', '100%')
					.append('div').classed('d3-layer-div', true) //div before gui for gui to work
					.style('position', 'absolute')
					.style('top', '0px')
					.style('left', '0px')
					.style('width', '100%')
					.style('height', '100%')
					.append('svg')
					.attr("id","d3-force-label-marker")
					.style('width', '100%')
					.style('height', '100%')

				d3.select("#d3-force-label-marker")
					.append("g")
					.attr("id","circleGrp")

				//d3 라벨이 만들어질시 화면 픽셀 초기화
				init00 = map.getPixelFromCoordinate(ol.proj.fromLonLat([0, 0]));
				init11 = map.getPixelFromCoordinate(ol.proj.fromLonLat([1, 1]));
				initScale = [init11[0]-init00[0], init11[1]-init00[1]];
				curr00 = init00;
				rescale = [1, 1];

				map.on('postrender', function(evt) {
					curr00 = map.getPixelFromCoordinate(ol.proj.fromLonLat([0, 0]));
					var curr11 = map.getPixelFromCoordinate(ol.proj.fromLonLat([1, 1]));
					var currScale = [curr11[0]-curr00[0], curr11[1]-curr00[1]];
					rescale = [currScale[0]/initScale[0], currScale[1]/initScale[1]];
					var retranslate = [curr00[0]-init00[0]*rescale[0], curr00[1]-init00[1]*rescale[1]];

					d3.select("#circleGrp").attr("transform","translate("+retranslate[0]+","+retranslate[1]+")");
					// d3.select("#circleGrp").attr("transform",
					//     "translate(" + retranslate[0] + "," + retranslate[1] + ")" +
					//     " scale(" + rescale[0] + "," + rescale[1] + ")");

				});

				map.on('moveend', function() {
					//드래그의끝, 줌의끝일때 동작
					//서버에 요청
					d3.select("#circleGrp").remove();
					init00 = map.getPixelFromCoordinate(ol.proj.fromLonLat([0, 0]));
					init11 = map.getPixelFromCoordinate(ol.proj.fromLonLat([1, 1]));
					initScale = [init11[0]-init00[0], init11[1]-init00[1]];
					curr00 = init00;
					rescale = [1, 1];
					d3.select("#d3-force-label-marker")
						.append("g")
						.attr("id","circleGrp")
					d3.select("#circleGrp").attr("transorm","translate(0,0)");
					// ol.proj.transform(d.geometry.coordinates[0], 'EPSG:5179','EPSG:3857');
					var p = map.getPixelFromCoordinate(ol.proj.fromLonLat([127.0709103,37.4003657]));
					d3.select("#circleGrp").append("rect")
						.attr("x",p[0])
						.attr("y",p[1])
						.attr("width",50)
						.attr("height",50)
				});

				map.on('wheel', function() {
					//휠이벤트시 circle그룹 제거
					d3.select("#circleGrp").remove();
				});

				return canvas[0][0];
			}

			function initialize() {
			}
			
			initialize();
	}
//	o2Visual.utils.sample()
	o2Visual.core = $.extend(o2Visual.core || {}, {
		pane : _class
	});
})();