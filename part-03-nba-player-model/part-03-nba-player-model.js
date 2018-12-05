/**
 * Avoid putting code outside of functions (global space), so you won't 
 * overwrite other's code / be overwritten accidentally. Try to only put 
 * your code in functions, class, or in the $(document).ready(...) function.
 * 
 */

function part03EntryPoint() {
    /**
     * Start coding here!
     * You are safe to access any components in the HTML file.
     * Below are example code, feel free to delete them.
     */

    let svg = d3.select(".part-03-my-svg").attrs({
        width: 400,
        height: 450,
    }).append("g")

    let rect = svg.append("rect").attrs({
        width: 100,
        height: 70,
        class: `part-03-rect`
    })


    /**
     * Loading Data
     * ===============
     * Place csv or json data files under `part-01-big-trend-timeseries/data/`
     * Then, load data like this (feel free to delete the code here, just for demostrating purpose):
     */
    d3.csv("part-03-nba-player-model/data/draft78.csv").then((data) => {
        // console.log('part 03 csv data is', data)
    })
}

/** TODO: Add your functions here! */

function changeimg(){
    let choice_position = $('input[name=position]:checked').val();
    let choice_height = $('input[name=height]:checked').val();
    let choice_weight = $('input[name=weight]:checked').val();
    let img = "";
    if (choice_position == "1") {
        img = "img/jordan.png";
        var elem =  document.getElementById("img");
        elem.setAttribute("src", img);
        drawradar();
        drawradar2();
        console.log(img);
    } else if (choice_position == "5") {
        img = "img/curry.png";
        var elem =  document.getElementById("img");
        elem.setAttribute("src", img);
        drawradar();
        console.log(img);
    };
}

function drawradar() {

    var options = {
        responsive: false,
        maintainAspectRatio: true,
        legend: false,
        scale: {
            ticks: {
                beginAtZero: true,
                max: 5,
                stepSize: 5
            }
        }
    };
    
    var dataLiteracy = {
        labels: ["Offense", "Defence", "Rebounding", "Potential"],
        datasets: [{
            label: 'palyer attack type',
            data: [5, 3, 2, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    };
    
    var ctx = document.getElementById("radar");
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: dataLiteracy,
        options: options
    });
    
    console.log(myRadarChart);

}

function drawradar2() {

    var options = {
        responsive: false,
        maintainAspectRatio: true,
        legend: false,
        scale: {
            ticks: {
                beginAtZero: true,
                max: 5,
                stepSize: 5,
            }
        }
    };
    var dataLiteracy = {
        labels: ["Close", "Medium", "3PT", "Free Throw","layup","Dunk"],
        datasets: [{
            label: 'palyer shoot type',
            data: [3, 4, 5, 5, 5, 1],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    var ctx = document.getElementById("radar2");
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: dataLiteracy,
        options: options
    });
    
    console.log(myRadarChart);

}


////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
    window.loadHtmlModuleSubject.subscribe(() => {
        part03EntryPoint()
    })
})