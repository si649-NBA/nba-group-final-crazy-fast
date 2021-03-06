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

  PART_01_SVG = d3.select(".part-01-my-svg").attrs({
    width: 600,
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

  SLIDER_VALUE = 1950
  setScale();
  drawScatterPlot(findDataItem(data, SLIDER_VALUE));
  setAxis();
  setTime(data);
  //setLabel();

  //find data in year 1950
  function findDataItem(data, part1_year) {
    var year = data.filter(function(d) {
      return d.year == part1_year;
    })
    return year;
  }

  //draw scatter plot
  function drawScatterPlot(data) {
    PART_01_SVG.selectAll("circle").remove()

    PART_01_SVG.selectAll("circle")
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
        if (d.position == "PG") {
          return "#6CB970";
        }
        if (d.postion == "SG") {
          return "#87D8FB";
        }
        if (d.position == "SF") {
          return "#8EA2F9";
        }
        if (d.position == "PF") {
          return "#E688F6"
        }
        if (d.position == "C") {
          return "#FB8C86"
        }
      })
  //.style("fill", "white");
  }

  //set scale
  function setScale() {
    var padding = 30;
    part1_xScale = d3.scaleLinear()
      .domain([50, 150])
      .range([padding, 600 - padding * 2]);
    part1_yScale = d3.scaleLinear()
      .domain([1.5, 2.3])
      .range([450 - padding, padding]);
  }

  //set label
  function setLabel(data) {
    PART_01_SVG.selectAll("text")
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

    PART_01_SVG.selectAll("circle")
      .on("mousemove", function(d) {
        $("[id=text" + d.name + "]").show();
      })
      .on("mouseout", function(d) {
        $("[id=text" + d.name + "]").hide();
      })
  }

  //set axis
  function setAxis() {
    var padding = 30;
    var xAxis = d3.axisBottom()
      .scale(part1_xScale)
      .ticks(10) //set number of ticks
      //d.tickFormat(d3.format(".0s"));

    PART_01_SVG.append("g")
      .attr("class", "part1_axis")
      .attr("transform", "translate(0," + (450 - padding) + ")") //move from top to bottom
      .call(xAxis)

    var yAxis = d3.axisLeft()
      .scale(part1_yScale)
      .ticks(6)
      .tickFormat(d3.format(",.1f"));

    PART_01_SVG.append("g")
      .attr("class", "part1_axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    //add x&y label
    PART_01_SVG.append("text")
      .attr("class", "part1_xlabel")
      .attr("text-anchor", "end")
      .attr("x", 500 + 40)
      .attr("y", 450 - 50)
      .text("Weight (kg)");


    PART_01_SVG.append("text")
      .attr("class", "part1_ylabel")
      .attr("text-anchor", "end")
      .attr("y", 10)
      .attr("dy", "4em")
      .attr("transform", "rotate(-90)")
      .text("Height (m)");
  }

  function setTime(data) {
    var running = false;
    var timer;
    $(".part1_bt").on("click", function() {
      var duration = 100,
        maxstep = 2017,
        minstep = 1950;
      if (running == true) {
        $(".part1_bt").html("Play");
        running = false;
        clearInterval(timer);
      } else if (running == false) {
        $(".part1_bt").html("Pause");
        SLIDER_VALUE = $("#slider").val();

        timer = setInterval(function() {
          if (SLIDER_VALUE < maxstep) {
            SLIDER_VALUE++;
            $("#slider").val(SLIDER_VALUE);
            $('#range').html(SLIDER_VALUE);
          }
          $("#slider").val(SLIDER_VALUE);
          drawScatterPlot(findDataItem(data, SLIDER_VALUE));
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
