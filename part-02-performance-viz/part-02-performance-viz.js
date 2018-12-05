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

    svgSize = {
        width: 600,
        height: 450
    }

    let svg = d3.select(".part-02-my-svg").attrs(svgSize).append("g")

    let rect = svg.append("rect").attrs(Object.assign({}, svgSize, {
        class: `part-02-rect`
    }))

    d3.csv("part-02-performance-viz/data/Seasons_Stats.csv").then((data) => {
        // console.log('d3 csv', data)
    })
}

/** TODO: Add your functions here! */





////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
    window.loadHtmlModuleSubject.subscribe((d) => {
        part02EntryPoint()
    })
})