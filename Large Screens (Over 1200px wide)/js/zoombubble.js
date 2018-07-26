// JavaScript Document


var width = 1100,
    height = 700,
	  margin = 10,
    diameter = width;

var svgCharlie = d3.select("#loveworkstat")
        .append("svg")
        .attr("class", "charlieChart")
        .attr("width", width)
        .attr("height", height)

        .append("g")


var x = svgCharlie.append("g").attr("transform", "translate("+ (width / 2) + "," + height / 2 + ")");



var pack = d3.pack()
    .size([height - margin, height - margin])
    .padding(2);

d3.json("data/bubble_data.json", function(error, root) {
  if (error) throw error;

  var color = d3.scaleLinear()
    // .domain([-1, 5])
    .range(["#2F7A92", "#6CBDBD"])
    .interpolate(d3.interpolateHcl);

  root = d3.hierarchy(root)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
      charlieNodes = pack(root).descendants(),
      view;

  var circleCharlie = x.selectAll(".charlies")
    .data(charlieNodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "nodebubble" : "nodebubble nodeleaf" : "nodebubble noderoot"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = x.selectAll(".label")
    .data(charlieNodes)
    .enter().append("text")
    .attr("class", "label")
    .attr('font-family', 'Lato')
    .attr('font-size', 30)
  
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var nodeCharlie = x.selectAll("circle,text");

  svgCharlie
      .style("background", "#ffffff")
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll(".label")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = height / v[2]; view = v;
    nodeCharlie.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circleCharlie.attr("r", function(d) { return d.r * k; });
  }
});

