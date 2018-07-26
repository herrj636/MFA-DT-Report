
(function() {
    var widthDelta = 1200,
        heightDelta = 500;

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

    var radiusScale = d3.scaleSqrt().domain([0, 15]).range([6, 6])

    var forceXSeparate = d3.forceX(function(d) {
        if (d.ao == 'wdc') {
            return 170
        } else if (d.ao == 'sad') {
            return 470
        } else if (d.ao == 'vrard') {
            return 730
        } else if (d.ao == 'vdc') {
            return 1030
        } else if (d.ao == 'pc') {
            return 170
        } else if (d.ao == 'mg') {
            return 470
        } else if (d.ao == 'bt') {
            return 730
        } else if (d.ao == 'bspm') {
            return 1030
        } else if (d.ao == 'dataviz') {
            return 170
        } else if (d.ao == 'aiml') {
            return 470
        } else if (d.ao == 'sgd') {
            return 730
        } else if (d.ao == 'pd') {
            return 1030
        } else {
          return 800
        }
    }).strength(0.085)

    var forceYSeparate = d3.forceY(function(d) {
        if (d.ao == 'wdc') {
            return 120
        } else if (d.ao == 'sad') {
            return 120
        } else if (d.ao == 'vrard') {
            return 120
        } else if (d.ao == 'vdc') {
            return 120
        } else if (d.ao == 'pc') {
            return 275
        } else if (d.ao == 'mg') {
            return 275
        } else if (d.ao == 'bt') {
            return 275
        } else if (d.ao == 'bspm') {
            return 275
        } else if (d.ao == 'dataviz') {
            return 425
        } else if (d.ao == 'aiml') {
            return 425
        } else if (d.ao == 'sgd') {
            return 425
        } else if (d.ao == 'pd') {
            return 425
        } else {
          return 800
        }
    }).strength(0.085)

    var forceXAT = d3.forceX(function(d) {
        if (d.at == 'wdc') {
            return 170
        } else if (d.at == 'sad') {
            return 470
        } else if (d.at == 'vrard') {
            return 730
        } else if (d.at == 'vdc') {
            return 1030
        } else if (d.at == 'pc') {
            return 170
        } else if (d.at == 'mg') {
            return 470
        } else if (d.at == 'bt') {
            return 730
        } else if (d.at == 'bspm') {
            return 1030
        } else if (d.at == 'dataviz') {
            return 170
        } else if (d.at == 'aiml') {
            return 470
        } else if (d.at == 'sgd') {
            return 730
        } else if (d.at == 'pd') {
            return 1030
        } else {
          return 800
        }
    }).strength(0.085)

    var forceYAT = d3.forceY(function(d) {
        if (d.at == 'wdc') {
            return 120
        } else if (d.at == 'sad') {
            return 120
        } else if (d.at == 'vrard') {
            return 120
        } else if (d.at == 'vdc') {
            return 120
        } else if (d.at == 'pc') {
            return 275
        } else if (d.at == 'mg') {
            return 275
        } else if (d.at == 'bt') {
            return 275
        } else if (d.at == 'bspm') {
            return 275
        } else if (d.at == 'dataviz') {
            return 425
        } else if (d.at == 'aiml') {
            return 425
        } else if (d.at == 'sgd') {
            return 425
        } else if (d.at == 'pd') {
            return 425
        } else {
          return 800
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
      .attr("x", 170)
      .text("Web development coding");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 170)
      .attr("y", 60)
      .text("(HTML, CSS, Javascript, PHP)");

      svg.append("text")
      .attr("class", "alltext textOne")
      .attr("x", 470)
      .text("Software and app");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 470)
      .attr("y", 60)
      .text("development coding");

      svg.append("text")
      .attr("class", "alltext textOne")
      .attr("x", 730)
      .text("3D Modeling");

      svg.append("text")
      .attr("class", "alltext special")
      .attr("x", 730)
      .attr("y", 60)
      .text("& VR/AR development");

      svg.append("text")
      .attr('class', 'alltext textOne')
      .attr("x", 1030)
      .text("Visual design concepts");

      d3.selectAll('.textOne')
      .attr('y', 40);

      //LINE TWO

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 150)
      .text("Physical computing");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 470)
      .text("Motion graphics");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 730)
      .text("Blockchain technology");

      svg.append("text")
      .attr("class", "alltext textTwo")
      .attr("x", 1030)
      .text("Business management skills");

      d3.selectAll('.textTwo')
      .attr('y', 215);

      //LINE THREE

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 150)
      .attr("y", 25)
      .text("Data management & data visualizations");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 470)
      .attr("y", 25)
      .text("AI & machine learning");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 730)
      .attr("y", 25)
      .text("Storytelling and/or game design");

      svg.append("text")
      .attr("class", "alltext textThree")
      .attr("x", 1030)
      .attr("y", 25)
      .text("Principles of Design");

      d3.selectAll('.textThree')
      .attr('y', 350);

      d3.selectAll('.alltext')
      .attr('text-anchor', 'middle')
      .attr('font-size', 15)
      .attr('font-family', 'Lato')
      .attr('font-weight', 600);


        var circlesDelta = svg.selectAll(".bubbles")
            .data(datapoints)
            .attr("class", ("bubbles"))
            .enter().append("circle")
            .attr("r", function(d) {
                return 5
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