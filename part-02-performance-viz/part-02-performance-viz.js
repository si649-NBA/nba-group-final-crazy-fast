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

    let dataCheckboxFilter = new DataCheckboxFilter({
        selector: '.part-2--weighed-filter',
        fields: weighedHeightViz.numericColumns.map((c) => c.name)
    })
    
}

class NumericColumn {
    constructor(name="", lineColor="") {
        this.name = name 
        this.className = `part-2--${this.name}--line`
        this.lineColor = lineColor
    }
}

class WeighedDataCheckbox {
    constructor(props) {
        let { identifierText="", labelText="" } = props;
        this.identifierText = identifierText;
        this.labelText = labelText;

        this.checkbox = this.generatejQueryObject()
    }

    generatejQueryObject() {
        let checkboxField = $("<div>", {
            class: `part-2--checkbox-field`
        })
        let checkbox = $("<input>", {
            type: `checkbox`,
            id: `part-2--${this.identifierText}-checkbox`
        })
        let label = $("<label>", {
            for: checkbox.attr('id'),
            class: `${checkbox.attr('id')}--label`
        }).text(this.labelText)
        
        checkboxField
            .append(checkbox)
            .append(label)
        
        return checkboxField
    }
}

class DataCheckboxFilter {
    constructor(props) {
        let { selector, fields } = props;
        this.selector = selector;
        this.jQueryObject = $(selector);
        this.fields = fields;
        this.checkboxFields = [];

        this.generateCheckboxes()
        for (let ch of this.checkboxFields) {
            this.jQueryObject.append(ch.checkbox)
        }
    }

    generateCheckboxes() {
        for (let f of this.fields) {
            let labelText = f.replace(/_/g, ' ')
            let checkboxField = new WeighedDataCheckbox({
                identifierText: f,
                labelText
            })
            this.checkboxFields.push(checkboxField)
        }
    }
}

/** TODO: Add your functions here! */
class WeighedHeightViz {
    constructor(props) {
        this.props = props;

        this.numericColumns = [
            new NumericColumn('height_avg', 'gray'),
            new NumericColumn('wed_h_by_orb_drb_sum_avg', 'purple'),
            new NumericColumn('wed_h_by_PTS_avg', 'red'),
            new NumericColumn('wed_h_by_AST_avg', 'orange'),
            new NumericColumn('wed_h_by_BLK_avg', 'blue'),
        ]

        this.loadData().then(() => {
            this.initVizSpace();
            this.initScale()
            this.initAxis()
            this.initAxisLabels()
            this.render()
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
            let mappedD = { year: d.id };
            for (let col of this.numericColumns.map((n) => n.name)) {
                mappedD = Object.assign(mappedD, {
                    [col]: +d[col]
                })
            }
            return mappedD
        })
    }

    concatenateArrays(arrays=[]) {
        let resultArray = []
        for (let arr of arrays) {
            resultArray = resultArray.concat(arr)
        }
        return resultArray
    }


    getColumnDataArray(columnName="") {
        return this.data.map((d) => d[columnName]);
    }

    computeYScaleMinMax(columnNames=[]) {
        return d3.extent(this.concatenateArrays(
            columnNames.map((col) => this.getColumnDataArray(col) )
        ))
    }

    initScale() {
        this.x = d3.scaleBand()
            .domain(this.data.map((d) => d.year))
            .range([0, this.props.svgSpec.innerSize.width])
            .padding(0.1)
            ;

        let [yMin, yMax] = this.computeYScaleMinMax(this.numericColumns.map((n) => n.name))

        this.y = d3.scaleLinear()
            .domain([
                yMin, yMax
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
        // transition
        this.svg.select(`.part-2--line`).remove();

        for (let col of this.numericColumns) {
            this.drawHeightLine({
                columnName: col.name,
                className: col.className,
                lineColor: col.lineColor
            })
        }
    }

    drawHeightLine(spec) {
        let { columnName, className, lineColor = "" } = spec;
        // not drawing the line! Calculating the data only.
        let line = d3.line()
            .curve(d3.curveBasis)
            .x((d) => {
                return this.x(d.year);
            })
            .y((d) => {
                return this.y(d[columnName]);
            })
            ;

        let path = this.svg.append("path")
            .datum(this.data) // data() VS datum(): https://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data
            .attr("class", `${className} part-2--line`)
            .attr("d", line)
            .styles({
                stroke: lineColor
            })
            ;

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

    render() {
        this.drawLines()
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