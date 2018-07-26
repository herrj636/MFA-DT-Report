

var units = "People";

// set the dimensions and marginSankeys of the graph

var marginSankey = {top: 10, right: 10, bottom: 10, left: 10},
    widthSankey = 1100 - marginSankey.left - marginSankey.right,
    heightSankey = 700 - marginSankey.top - marginSankey.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; };
    




// append the svg object to the body of the page
var svg = d3.select("#sankeychart").append("svg")

    .attr("class", "alphaChart")
    .attr("width", widthSankey + marginSankey.left + marginSankey.right)
    .attr("height", heightSankey + marginSankey.top + marginSankey.bottom)
    .attr("viewbox", "0, 0, 500, 900")
    .append("g")
    .attr("transform", 
          "translate(" + marginSankey.left + "," + marginSankey.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(20)
    .size([widthSankey, heightSankey]);

var path = sankey.link();

// load the data
d3.json("data/sankey-formatted.json", function(error, graph) {

var color = d3.scaleOrdinal()

       .range(["#0507c4", "#950002", "#0ec9ff", "#fd9b29", "#178120", "#8d0f9e", "#746eff", "#ff4667", "#09fece", "#fef758", "#21ce03", "#68fc92", "#8a53fe", "#bc5900", "#e512be", "#c153fd", "#05bf6c", "#660cd6", "#a80c5f", "#0560bc", "#1592db", "#da0c09", "#fe6528"]);

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".alpha")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "alpha")
      .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
      return d.color = color(d.name.replace(/ .*/, "")); 
  })
      .style("stroke", function(d) { 
      return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
      return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .attr('font-family', 'Lato')
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform", 
            "translate(" 
               + d.x + "," 
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});

