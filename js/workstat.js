// Credit to sources:
// Create a jQuery Slide Menu (Side Pulling Content): https://www.youtube.com/watch?v=hxND35w0L2I
// This code is inspired in the work and tutorial of Jonathan Soma: https://www.youtube.com/watch?v=lPr60pexvEM

//SIDEBAR CODE
// $(document).ready(function(){
// 		$('#sidebar-btn').click(function(){
// 			$('#sidebar').toggleClass('visible');
// 		});
// 	});


(function() {
	var width = 1000,
	  height = 700;

	var svg = d3.select("#workStatChart")
	  .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0,0)")

    var radiusScale = d3.scaleSqrt().domain([0, 15]).range([10,75])

    var simulation = d3.forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.075))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d){
      	return radiusScale(d.votes) + 13;
      }))

    var color = d3.scaleOrdinal()
	              .range(["#ffffff"]);

    d3.queue()
      .defer(d3.csv, "data/workstat.csv")
      .await(ready)

    function ready (error, datapoints){

    	var circles = svg.selectAll(".artist")
    	  .attr("id", function(d) { 
    	  	return d.id; 
    	  })
    	  .data(datapoints)
    	  .enter().append("circle")
    	  .attr("class", "artist")
    	  .attr("r", function(d)  {
    	  	return radiusScale(d.votes)
    	  })
    	  .attr("fill", function(d) { 
    	  	return color(d.id); 
    	  })
    	  .on('click', function(d)  {
    	  	console.log(d)
    	  })

      var texts = svg.selectAll(null)
        .data(datapoints)
        .enter()
        .append('text')
        .text(d => d.id)
        .attr('text-anchor', 'middle')
        .attr('color', 'black')
  	    .attr('font-family', 'Lato')
        .attr('font-weight', 'bold')
        .attr('font-size', 15)
        .attr('inline-size', '100px')
	  

    simulation.nodes(datapoints)
      .on('tick', ticked)

    function ticked() {
    	circles
    	  .attr("cx", function(d)  {
    	  	return d.x
    	  })
    	  .attr("cy", function(d)  {
    	  	return d.y
    	  });

      texts
        .attr('x', (data) => {
            return data.x
        })
        .attr('y', (data) => {
            return data.y
        });
        }
    
    }

    })();