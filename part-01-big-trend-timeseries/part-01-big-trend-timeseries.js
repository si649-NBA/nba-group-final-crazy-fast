/**
 * Avoid putting code outside of functions (global space), so you won't 
 * overwrite other's code / be overwritten accidentally. Try to only put 
 * your code in functions, class, or in the $(document).ready(...) function.
 * 
 */

function part01EntryPoint() {
    /**
     * Start coding here!
     * You are safe to access any components in the HTML file.
     * Below are example code, feel free to delete them.
     */

    let svg = d3.select(".part-01-my-svg").attrs({
        width: 500,
        height: 350,
    }).append("g")

    let rect = svg.append("rect").attrs({
        width: 40,
        height: 70,
        class: `part-01-rect`
    })

    /**
     * Loading Data
     * ===============
     * Place csv or json data files under `part-01-big-trend-timeseries/data/`
     * Then, load data like this (feel free to delete the code here, just for demostrating purpose):
     */
    d3.csv("part-01-big-trend-timeseries/data/draft78.csv").then((data) => {
        // console.log('part 01 csv data is', data)
    })
}

/** TODO: Add your functions here! */




////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
    window.loadHtmlModuleSubject.subscribe(() => {
        part01EntryPoint()
    })
})