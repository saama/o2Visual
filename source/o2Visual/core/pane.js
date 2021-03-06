(function() {
    "use strict";
    var _class = {

        init00 : null,
        init11 : null,
        initScale : null,
        curr00 : null,
        curr11 : null,
        rescale : null,
        currScale : null,
        retranslate : null,
        map : null,

        initPane : function(){
            var _self = this;
            _self.map=o2Visual._panel.Map.map;
            var canvas = d3.select('#map .ol-viewport')
                .insert('div').classed('d3-layer', true) //div before gui for gui to work
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

            // d3.select("#circleGrp").attr("transform","translate(0,0)");

            _self.resetPane();
            _self.map.on('wheel', function() {
                _self.map.un('postrender');
                d3.select("#circleGrp").selectAll("*").remove();
            });
            _self.map.on('moveend', function() {
                _self.resetPane();
            });
        },

        resetPane: function(){
            var _self = this;
            _self.map.un('postrender');
            d3.select("#circleGrp").selectAll("*").remove();

            _self.init00 = _self.map.getPixelFromCoordinate(ol.proj.fromLonLat([0, 0]));
            _self.init11 = _self.map.getPixelFromCoordinate(ol.proj.fromLonLat([1, 1]));
            _self.initScale = [_self.init11[0]-_self.init00[0], _self.init11[1]-_self.init00[1]];
            _self.retranslate = [0, 0];

            d3.select("#circleGrp").attr("transform","translate("+_self.retranslate[0]+","+_self.retranslate[1]+")");
            _self.map.on('postrender',_self.render);
            _self.makeObject();
        },

        makeObject: function(){
            var _self = this;
            var p = _self.map.getPixelFromCoordinate(ol.proj.fromLonLat([127.0709103,37.4003657]));
            d3.select("#circleGrp").append("rect")
                .attr("x",p[0])
                .attr("y",p[1])
                .attr("width",30)
                .attr("height",30)

            var p = _self.map.getPixelFromCoordinate(ol.proj.fromLonLat([127.0209103,37.4503657]));
            d3.select("#circleGrp").append("rect")
                .attr("x",p[0])
                .attr("y",p[1])
                .attr("width",30)
                .attr("height",30)
        },

        render : function(){
            o2Visual.core.pane.curr00 = o2Visual.core.pane.map.getPixelFromCoordinate(ol.proj.fromLonLat([0, 0]));
            o2Visual.core.pane.curr11 = o2Visual.core.pane.map.getPixelFromCoordinate(ol.proj.fromLonLat([1, 1]));
            o2Visual.core.pane.currScale = [o2Visual.core.pane.curr11[0]-o2Visual.core.pane.curr00[0], o2Visual.core.pane.curr11[1]-o2Visual.core.pane.curr00[1]];
            o2Visual.core.pane.rescale = [o2Visual.core.pane.currScale[0]/o2Visual.core.pane.initScale[0], o2Visual.core.pane.currScale[1]/o2Visual.core.pane.initScale[1]];
            o2Visual.core.pane.retranslate = [o2Visual.core.pane.curr00[0]-o2Visual.core.pane.init00[0]*o2Visual.core.pane.rescale[0], o2Visual.core.pane.curr00[1]-o2Visual.core.pane.init00[1]*o2Visual.core.pane.rescale[1]];
            d3.select("#circleGrp").attr("transform","translate("+o2Visual.core.pane.retranslate[0]+","+o2Visual.core.pane.retranslate[1]+")");
        },
    }
    o2Visual.core = $.extend(o2Visual.core || {}, {
        pane : _class
    });
})();
