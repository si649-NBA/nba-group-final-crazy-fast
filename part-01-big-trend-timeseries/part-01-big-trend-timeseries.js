/**
 * Avoid putting code outside of functions (global space), so you won't
 * overwrite other's code / be overwritten accidentally. Try to only put
 * your code in functions, class, or in the $(document).ready(...) function.
 *
 */

async function part01EntryPoint() {
  /**
   * Start coding here!
   * You are safe to access any components in the HTML file.
   * Below are example code, feel free to delete them.
   */

  let svg = d3.select(".part-01-my-svg").attrs({
    width: 700,
    height: 450,
  }).append("g")

  /**
   * Loading Data
   * ===============
   * Place csv or json data files under `part-01-big-trend-timeseries/data/`
   * Then, load data like this (feel free to delete the code here, just for demostrating purpose):
   */
  let data = await d3.csv("part-01-big-trend-timeseries/data/data.csv")
  //console.log("dataload complete")
  DATA = data;
  setScale();
  drawScatterPlot(findDataItem(data));
  setAxis();
  setTime();
  //setLabel();

  //find data in year 1950
  function findDataItem(data) {
    //console.log("filtering")
    var part1_year = 2016;
    var year = data.filter(function(d) {
      return d.year == part1_year;
    })
    return year;
  }

  //draw scatter plot
  function drawScatterPlot(data) {
    var part1_colorScale = d3.scaleOrdinal(d3.schemeCategory20b); //color
    //console.log("drawing")
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "part1_point")
      .attr("cx", function(d) {
        return part1_xScale(d.weight);
      })
      .attr("cy", function(d) {
        return part1_yScale(d.height);
      })
      .attr("r", 3)
      .style("fill", function(d) {
        return part1_colorScale(function(d) {
          return d.position;
        });
      })
  //.style("fill", "white");
  }

  //set scale
  function setScale() {
    var padding = 50;
    part1_xScale = d3.scaleLinear()
      .domain([60, 150])
      .range([padding, 700 - padding * 2]);
    part1_yScale = d3.scaleLinear()
      .domain([1.6, 2.3])
      .range([450 - padding, padding]);
  }

  //set label
  function setLabel(data) {
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("id", function(d) {
        return "text" + d.name;
      })
      .text(function(d) {
        return d.name;
      })
      .attr("x", function() {
        return part1_xScale(d.weight) + 2;
      })
      .attr("y", function() {
        return part1_yScale(d.height);
      })
      .style("display", "none");

    svg.selectAll("circle")
      .on("mousemove", function(d) {
        $("[id=text" + d.name + "]").show();
      })
      .on("mouseout", function(d) {
        $("[id=text" + d.name + "]").hide();
      })
  }

  //set axis
  function setAxis() {
    var padding = 50;
    var xAxis = d3.axisBottom()
      .scale(part1_xScale)
      .ticks(10) //set number of ticks
      //d.tickFormat(d3.format(".0s"));

    svg.append("g")
      .attr("class", "part1_axis")
      .attr("transform", "translate(0," + (450 - padding) + ")") //move from top to bottom
      .call(xAxis)

    var yAxis = d3.axisLeft()
      .scale(part1_yScale)
      .ticks(6)
      .tickFormat(d3.format(",.1f"));

    svg.append("g")
      .attr("class", "part1_axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    //add x&y label
    svg.append("text")
      .attr("class", "part1_xlabel")
      .attr("text-anchor", "end")
      .attr("x", 500 + 70)
      .attr("y", 450 - 70)
      .text("Weight (kg)");


    svg.append("text")
      .attr("class", "part1_ylabel")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", "4em")
      .attr("transform", "rotate(-90)")
      .text("Height (m)");
  }

  function setTime() {
    var running = false;
    var timer;
    $(".part1_bt").on("click", function() {
      var duration = 10,
        maxstep = 2018,
        minstep = 1950;
      if (running == true) {
        $(".part1_bt").html("Play");
        running = false;
        clearInterval(timer);
      } else if (running == false) {
        $(".part1_bt").html("Pause");
        sliderValue = $("#slider").val();

        timer = setInterval(function() {
          if (sliderValue < maxstep) {
            sliderValue++;
            $("#slider").val(sliderValue);
            $('#range').html(sliderValue);
          }
          $("#slider").val(sliderValue);
        //updateYear();
        }, duration);
        running = true;
      }
    });

    $("#slider").on("change", function() {
      update();
      $("#range").html($("#slider").val());
      clearInterval(timer);
      $(".part1_bt").html("Play");
    });
  }
}

/** TODO: Add your functions here! */



////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
  window.loadHtmlModuleSubject.subscribe(() => {
    part01EntryPoint().then()
  })
})
