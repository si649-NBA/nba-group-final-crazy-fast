d3.csv("data.csv", function(dataset) {
  var years = [];
  data = dataset;

  //create a button for each year in the timeline
  dataset.forEach(function(d) {
    console.log(d.time);

    //if not existing button for timeline
    if ($.inArray(d.time, years) == -1) {
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-default");
      button.setAttribute('onclick', 'update("' + d.time + '")');
      var t = document.createTextNode(d.time);
      button.appendChild(t);
      $("#timeline").append(button);
      years.push(d.time);
    }
  })

  //create circles for the first year
  svg.selectAll("circle")
    .data(dataset.filter(function(d) {
      return d.time == d3.min(years);
    }, function(d) {
      return d.name;
    }))
    .enter()
    .append("circle")
    //.filter(function(d){ return d.time == d3.min(years); })
    .attr("cx", function(d) {
      return d.xAxis * 10;
    })
    .attr("cy", function(d) {
      return d.yAxis;
    })
    .style("fill", function(d) {
      return d.color;
    })
    .transition()
    .duration(800)
    .attr("r", function(d) {
      return d.radius
    });
});

function update(year) {
  var circle = svg.selectAll("circles")
    .data(data.filter(function(d) {
      return d.time == year;
    }), function(d) {
      return d.name;
    });

  //update
  circle.attr("class", "update")
    .filter(function(d) {
      return d.time == year;
    })
    .transition()
    .duration(800)
    .attr("cx", function(d) {
      return d.xAxis * 10;
    })
    .attr("cy", function(d) {
      return d.yAxis;
    })
    .attr("r", function(d) {
      return d.radius
    });


  //enter
  circle.enter().append("circle")
    .filter(function(d) {
      return d.time == year;
    })
    .attr("cx", function(d) {
      return d.xAxis * 10;
    })
    .attr("cy", function(d) {
      return d.yAxis;
    })
    .style("fill", function(d) {
      return d.color;
    })
    .attr("r", function(d) {
      return d.radius
    });

  //exit
  circle.exit()
    .remove();
}
