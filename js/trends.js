
(function() {
    var widthDelta = 1500,
        heightDelta = 800;

    var svg = d3.select("#trendstat")
        .append("svg")
        .attr("width", widthDelta)
        .attr("height", heightDelta)
        .attr("fill", "black")
        .append("g")
        .attr("transform", "translate(0,0)")

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "lightgray");

    var radiusScale = d3.scaleSqrt().domain([0, 15]).range([10, 10])

    var forceXSeparate = d3.forceX(function(d) {
        if (d.ao == 'wdc') {
            return 250
        } else if (d.ao == 'sad') {
            return 600
        } else if (d.ao == 'vrard') {
            return 950
        } else if (d.ao == 'vdc') {
            return 1220
        } else if (d.ao == 'pc') {
            return 250
        } else if (d.ao == 'mg') {
            return 600
        } else if (d.ao == 'bt') {
            return 950
        } else if (d.ao == 'bspm') {
            return 1220
        } else if (d.ao == 'dataviz') {
            return 250
        } else if (d.ao == 'aiml') {
            return 600
        } else if (d.ao == 'sgd') {
            return 950
        } else if (d.ao == 'pd') {
            return 1220
        } else {
          return 1000
        }
    }).strength(0.085)

    var forceYSeparate = d3.forceY(function(d) {
        if (d.ao == 'wdc') {
            return 180
        } else if (d.ao == 'sad') {
            return 180
        } else if (d.ao == 'vrard') {
            return 180
        } else if (d.ao == 'vdc') {
            return 180
        } else if (d.ao == 'pc') {
            return 400
        } else if (d.ao == 'mg') {
            return 400
        } else if (d.ao == 'bt') {
            return 400
        } else if (d.ao == 'bspm') {
            return 400
        } else if (d.ao == 'dataviz') {
            return 650
        } else if (d.ao == 'aiml') {
            return 650
        } else if (d.ao == 'sgd') {
            return 650
        } else if (d.ao == 'pd') {
            return 650
        } else {
          return 1000
        }
    }).strength(0.085)

    var forceXAT = d3.forceX(function(d) {
        if (d.at == 'wdc') {
            return 250
        } else if (d.at == 'sad') {
            return 600
        } else if (d.at == 'vrard') {
            return 950
        } else if (d.at == 'vdc') {
            return 1220
        } else if (d.at == 'pc') {
            return 250
        } else if (d.at == 'mg') {
            return 600
        } else if (d.at == 'bt') {
            return 950
        } else if (d.at == 'bspm') {
            return 1220
        } else if (d.at == 'dataviz') {
            return 250
        } else if (d.at == 'aiml') {
            return 600
        } else if (d.at == 'sgd') {
            return 950
        } else if (d.at == 'pd') {
            return 1220
        } else {
          return 1000
        }
    }).strength(0.085)

    var forceYAT = d3.forceY(function(d) {
        if (d.at == 'wdc') {
            return 180
        } else if (d.at == 'sad') {
            return 180
        } else if (d.at == 'vrard') {
            return 180
        } else if (d.at == 'vdc') {
            return 180
        } else if (d.at == 'pc') {
            return 400
        } else if (d.at == 'mg') {
            return 400
        } else if (d.at == 'bt') {
            return 400
        } else if (d.at == 'bspm') {
            return 400
        } else if (d.at == 'dataviz') {
            return 650
        } else if (d.at == 'aiml') {
            return 650
        } else if (d.at == 'sgd') {
            return 650
        } else if (d.at == 'pd') {
            return 650
        } else {
          return 1000
        }
    }).strength(0.085)


    // var forceXCombine = d3.forceX(width / 2).strength(0.085)

    var forceCollide = d3.forceCollide(function(d) {
        return radiusScale(d.size)
    })

    var simulation = d3.forceSimulation()
        .force("x", forceXSeparate)
        .force("y", forceYSeparate)
        .force("collide", forceCollide)


    var color = d3.scaleOrdinal()
      .range(['#820333']);

    d3.queue()
        .defer(d3.json, "data/answerdata.json")
        .await(ready)

    function ready(error, datapoints) {

      svg.append("text")
      .attr("class", "alltext textOne")
      .attr("x", 260)
      .text("Web development coding");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 260)
      .attr("y", 75)
      .text("(HTML, CSS, Javascript, PHP)");

      svg.append("text")
      .attr("class", "alltext textOne")
      .attr("x", 600)
      .text("Software and app");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 600)
      .attr("y", 75)
      .text("development coding");

      svg.append("text")
      .attr("class", "alltext textOne")
      .attr("x", 940)
      .text("3D Modeling");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 940)
      .attr("y", 75)
      .text("& VR/AR development");

      svg.append("text")
      .attr('class', 'alltext textOne')
      .attr("x", 1240)
      .text("Visual design concepts");

      d3.selectAll('.textOne')
      .attr('y', 50);

      //LINE TWO

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 260)
      .text("Physical computing");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 600)
      .text("Motion graphics");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 940)
      .text("Blockchain technology");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 1240)
      .text("Business management skills");

      d3.selectAll('.textTwo')
      .attr('y', 300);

      //LINE THREE

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 260)
      .attr("y", 25)
      .text("Data management & data visualizations");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 600)
      .attr("y", 25)
      .text("AI & machine learning");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 940)
      .attr("y", 25)
      .text("Storytelling and/or game design");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 1240)
      .attr("y", 25)
      .text("Principles of Design");

      d3.selectAll('.textThree')
      .attr('y', 550);

      d3.selectAll('.alltext')
      .attr('text-anchor', 'middle')
      .attr('font-size', 20)
      .attr('font-family', 'Lato')
      .attr('font-weight', 600);


        var circlesDelta = svg.selectAll(".bubbles")
            .data(datapoints)
            .attr("class", ("bubbles"))
            .enter().append("circle")
            .attr("r", function(d) {
                return 8
            })
            .attr("fill", function(d) {
                return color(d.id);
            })
            .on('click', function(d) {
                console.log(d)
            })


        d3.select("#decade").on('click', function() {
            simulation
                .force("x", forceXSeparate)
                .alphaTarget(0.2)
                .restart()
                .force("y", forceYSeparate)
                .alphaTarget(0.2)
                .restart()
            console.log("You clicked me")
        })

        d3.select("#combine").on('click', function() {
            simulation
                .force("x", forceXAT)
                .alphaTarget(0.2)
                .restart()
                .force("y", forceYAT)
                .alphaTarget(0.2)
                .restart()
            console.log("You clicked me")
        })

        simulation.nodes(datapoints)
            .on('tick', ticked)


        function ticked() {
            circlesDelta
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                });

            
        }


}


})();