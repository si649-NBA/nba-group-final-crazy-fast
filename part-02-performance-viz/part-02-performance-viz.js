/**
 * Avoid putting code outside of functions (global space), so you won't
 * overwrite other's code / be overwritten accidentally. Try to only put
 * your code in functions, class, or in the $(document).ready(...) function.
 *
 */

function part02EntryPoint() {
  /**
   * TODO: Start coding here!
   * You are safe to access any components in the HTML file.
   * Below are example code, feel free to delete them.
   */

  svgSpec = {
    innerSize: {
      width: 700,
      height: 350
    },
    margin: {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50,
    }
  }
  svgSpec.outerSize = {
    width: svgSpec.innerSize.width + svgSpec.margin.left + svgSpec.margin.right,
    height: svgSpec.innerSize.height + svgSpec.margin.top + svgSpec.margin.bottom,
  }

  let weighedHeightViz = new WeighedHeightViz({
    svgSpec
  });


}

/** TODO: Add your functions here! */
class WeighedHeightViz {
  constructor(props) {
    this.props = props;
    this.loadData().then(() => {
      this.initVizSpace();
      this.initScale()
      this.initAxis()
      this.initAxisLabels()
      this.drawLines()
    })
  }

  initVizSpace() {
    this.svg = d3.select(".part-02-my-svg").attrs(this.props.svgSpec.outerSize)
      .append("g").attrs({
      transform: `translate(${this.props.svgSpec.margin.left}, ${this.props.svgSpec.margin.top})`
    })

  }

  async loadData() {
    this.data = await d3.csv("part-02-performance-viz/data/processed_all_positions_years_height_df.csv");
    this.data = this.data.map((d) => {
      return {
        year: d.year,
        height: parseFloat(d.height),
        weighed_height_by_orb_drb_sum: parseFloat(d.weighed_height_by_orb_drb_sum),
        weighed_height_by_pts: parseFloat(d.weighed_height_by_pts),
      }
    })
  }

  initScale() {
    this.x = d3.scaleBand()
      .domain(this.data.map((d) => d.year))
      .range([0, this.props.svgSpec.innerSize.width])
      .padding(0.1)
    ;

    let yScaleValueInstances = this.data.map((d) => d.height).concat(
      this.data.map((d) => d.weighed_height_by_orb_drb_sum)
    ).concat(
      this.data.map((d) => d.weighed_height_by_pts)
    );
    this.y = d3.scaleLinear()
      .domain([
        d3.min(yScaleValueInstances),
        d3.max(yScaleValueInstances)
      ])
      .range([this.props.svgSpec.innerSize.height, 0])
    ;
  }

  initAxis() {
    this.xAxis = this.svg.append("g").attrs({
      transform: `translate(0, ${this.props.svgSpec.innerSize.height})`
    }).call(d3.axisBottom(this.x))

    this.yAxis = this.svg.append("g")
      .call(d3.axisLeft(this.y))
  }

  initAxisLabels() {
    this.xAxis.selectAll("text").attrs({
      "text-anchor": "center",
      dy: "0.5rem",
      dx: "0.5rem",
      transform: "rotate(45)"
    })
  }

  drawLines() {
    this.drawHeightLine({
      columnName: 'height',
      className: 'part-02-height-line'
    })
    this.drawHeightLine({
      columnName: 'weighed_height_by_orb_drb_sum',
      className: 'part-02-weighed-height-odrb-line'
    })
    this.drawHeightLine({
      columnName: 'weighed_height_by_pts',
      className: 'part-02-weighed-height-pts-line'
    })


  }

  drawHeightLine(spec) {
    let {columnName, className} = spec;
    // not drawing the line! Calculating the data only.
    let line = d3.line()
      .x((d) => {
        return this.x(d.year);
      })
      .y((d) => {
        return this.y(d[columnName]);
      });

    // transition
    this.svg.select(`.${className}`).remove();

    let path = this.svg.append("path")
      .datum(this.data) // data() VS datum(): https://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data
      .attr("class", className)
      .attr("d", line);

    let totalLength = path.node().getTotalLength();

    path
      .attrs({
        "stroke-dasharray": `${totalLength} ${totalLength}`,
        "stroke-dashoffset": totalLength,
      })
      .transition()
      .duration(4000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
    ;
  }
}




////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
  window.loadHtmlModuleSubject.subscribe((d) => {
    part02EntryPoint()
  })
})
