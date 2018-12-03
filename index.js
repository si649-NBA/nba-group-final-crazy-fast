const { Subject } = rxjs;

window.loadHtmlModuleSubject = new Subject();
// console.log('subject set');

function loadHtmlModule(selector, htmlTemplatePath) {
    return new Promise((resolve, reject) => {
        try {
            $(selector).load(htmlTemplatePath, () => {
                // console.log(`html module loaded for ${selector}`)
                resolve();
            })
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    })
}


$(document).ready(async () => {
    // console.log('index js document ready');
    await loadHtmlModule(
        ".part-01-big-trend-timeseries-container",
        "part-01-big-trend-timeseries/part-01-big-trend-timeseries.html"
    )

    await loadHtmlModule(
        ".part-02-performance-viz-container",
        "part-02-performance-viz/part-02-performance-viz.html"
    )

    await loadHtmlModule(
        ".part-03-nba-player-model-container",
        "part-03-nba-player-model/part-03-nba-player-model.html"
    )

    // console.log('all html modules loaded; ready to next()')
    window.loadHtmlModuleSubject.next("All html modules loaded")

})