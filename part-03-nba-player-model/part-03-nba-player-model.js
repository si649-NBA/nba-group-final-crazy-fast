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
PART_03_TRANSITING = false;

function changeimg() {

    if (PART_03_TRANSITING) return

  for (let canvasDOM of $("canvas")) {
    let context = canvasDOM.getContext('2d')
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  }

  let choice_position = $('input[name=position]:checked').val();
  let choice_height = $('input[name=height]:checked').val();
  let choice_weight = $('input[name=weight]:checked').val();
  let img = "";
  if (choice_position == "1" && choice_height == "3" && choice_weight == "3") {
    img = "img/Embiid.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(1);
    drawradar2(1);
  } else if (choice_position == "1" && choice_height == "3" && choice_weight == "2") {
    img = "img/Capela.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(2);
    drawradar2(2);
    console.log(img);
  } else if (choice_position == "1" && choice_height == "2" && choice_weight == "3") {
    img = "img/Griffin.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(3);
    drawradar2(3);
    console.log(img);
  } else if (choice_position == "1" && choice_height == "2" && choice_weight == "2") {
    img = "img/Green.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(4);
    drawradar2(4);
    console.log(img);
  } else if (choice_position == "2" && choice_height == "1" && choice_weight == "1") {
    img = "img/Thomas.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(5);
    drawradar2(5);
    console.log(img);
  } else if (choice_position == "2" && choice_height == "1" && choice_weight == "2") {
    img = "img/Lowry.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(6);
    drawradar2(6);
    console.log(img);
  } else if (choice_position == "2" && choice_height == "2" && choice_weight == "1") {
    img = "img/Curry.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(7);
    drawradar2(7);
    console.log(img);
  } else if (choice_position == "2" && choice_height == "2" && choice_weight == "2") {
    img = "img/Wall.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(8);
    drawradar2(8);
    console.log(img);
  } else if (choice_position == "3" && choice_height == "3" && choice_weight == "3") {
    img = "img/James.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(9);
    drawradar2(9);
    console.log(img);
  } else if (choice_position == "3" && choice_height == "3" && choice_weight == "2") {
    img = "img/Antetokounmpo.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(10);
    drawradar2(10);
    console.log(img);
  } else if (choice_position == "3" && choice_height == "2" && choice_weight == "1") {
    img = "img/Ingram.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(11);
    drawradar2(11);
    console.log(img);
  } else if (choice_position == "3" && choice_height == "2" && choice_weight == "3") {
    img = "img/Tucker.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(12);
    drawradar2(12);
    console.log(img);
  } else if (choice_position == "3" && choice_height == "2" && choice_weight == "2") {
    img = "img/Durant.png";
    var elem = document.getElementById("img");
    elem.setAttribute("src", img);
    drawradar(13);
    drawradar2(13);
    console.log(img);
  } else {
      PART_03_TRANSITING = true
      if ($(".part3-outputs").css("display") !== "none") {
        $(".part3-outputs")
        .css("display", "flex")
        .fadeOut(400, () => {
            $(".avatar--error-msg").fadeIn(500, () => {
                PART_03_TRANSITING = false
            })
        })
      }
      else {
          if ($(".avatar--error-msg").css("display") !== "none") {
            $(".avatar--error-msg").hide()
          }
        $(".avatar--error-msg").fadeIn(500, () => {
            PART_03_TRANSITING = false
        })
      }
    
    console.log("no such player")
  }
}

function drawradar(i) {
    $(".avatar--error-msg").hide()

    PART_03_TRANSITING = true
    $(".part3-outputs")
        .css("display", "flex")
        .hide()
        .fadeIn(800, () => {
            PART_03_TRANSITING = false
        })

  i = i - 1;

  var data = [
    [5, 4, 5, 5],
    [3, 4, 5, 3],
    [5, 3, 4, 4],
    [3, 5, 4, 4],
    [4, 2, 2, 3],
    [5, 3, 3, 5],
    [3, 3, 3, 3],
    [4, 4, 3, 3],
    [5, 5, 4, 4],
    [5, 4, 5, 5],
    [3, 3, 3, 4],
    [3, 2, 3, 2],
    [5, 4, 4, 5]
  ]

  var options = {
    // responsive: false,
    // maintainAspectRatio: true,
    // legend: false,
    scale: {
      ticks: {
        beginAtZero: true,
      // max: 5,
      // stepSize: 5
      }
    // display: false
    }
  };

  var dataLiteracy = {
    labels: ["Offense", "Defence", "Rebounding", "Potential"],
    datasets: [{
      label: 'Player attack type',
      data: data[i],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'
      ],
      borderWidth: 1
    }]
  };

  var ctx = document.getElementById("radar").getContext('2d');
  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: dataLiteracy,
    options: options
  });

//   console.log(myRadarChart);

}

function drawradar2(j) {
  j = j - 1;
  var data = [
    [5, 4, 3, 5, 5, 5],
    [5, 3, 1, 2, 3, 5],
    [5, 4, 3, 3, 5, 5],
    [3, 3, 3, 4, 3, 3],
    [3, 4, 4, 5, 4, 1],
    [4, 3, 4, 5, 4, 1],
    [5, 5, 5, 5, 5, 1],
    [5, 3, 3, 3, 5, 4],
    [5, 5, 4, 5, 5, 5],
    [5, 3, 2, 3, 4, 5],
    [4, 4, 3, 5, 3, 3],
    [4, 2, 3, 4, 2, 3],
    [5, 5, 5, 5, 5, 5]
  ]

  var options = {
    // responsive: false,
    // maintainAspectRatio: true,
    // legend: true,
    scale: {
      ticks: {
        beginAtZero: true,
      // max: 5,
      // stepSize: 5,
      }
    // display:false
    }
  };
  var dataLiteracy = {
    labels: ["Close", "Medium", "3PT", "Free Throw", "layup", "Dunk"],
    datasets: [{
      label: 'Player shoot type',
      data: data[j],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };

  var ctx = document.getElementById("radar2").getContext('2d');
  var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: dataLiteracy,
    options: options
  });

//   console.log(myRadarChart);

}


////////////////////////////////////////////////////
//        Please Leave Below Code Unchanged       //
////////////////////////////////////////////////////

$(document).ready(() => {
  window.loadHtmlModuleSubject.subscribe(() => {
    part03EntryPoint()
  })
})
