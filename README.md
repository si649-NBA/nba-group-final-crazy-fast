# nba-group-final-crazy-fast
Group project for our NBA team for SI 649; with simplified, easy to use/join code base.

## Quickstart

1. Clone this project to your local by `git clone https://github.com/si649-NBA/nba-group-final-crazy-fast.git`
1. `cd` to project root directory
1. Turn on the dev server by `. ./runserver.sh`. (We use python3's http server, you can take a look at `runserver.sh`!)
1. Open your browser at `http://localhost:8001/`. There's not much there at this point...
1. Look at the folders in the project root, there are `part-01-big-trend-timeseries`, `part-02-performance-viz` and `part-03-nba-player-model`, each of them correspond to the sections of our app, and has their own `HTML/CSS/JavaScript` files. 
1. **Only edit the files in the folder for your designated feature.** For example, if you work on the NBA profile model, which is part 3, then only edit files that are in folder `part-03-nba-player-model`.
1. There are some starter code to help you get started! But also notice that there're some parts you should not change and are highlighted for you.
1. Happy coding! As long as you only modify files in your designated feature's directory, you can push your code to this repo directly w/o creating pull request. **But make sure your code is error-free before pushing to this repo**, otherwise everyone will see your error messages...🙀

### TODOS

- ~~SETUP code base for each team members~~
- CI to github page

# Reference

- gh-page --> needs npm --> needs webpack
  - seems it's hard to just setup webpack manually. it's best to just use create-react-app, and use as little as you can about JSX, props and states. (Just use them as plain html/css/javascript) But indeed there're issues and react may need further cautions...
  - so indeed the current approach is the best for now!
  - *just use local dev instead...!*
- [Using Observables and Subject](https://stackoverflow.com/questions/36814995/rxjs-multiple-subscriptions-to-observable)
- [Load html module in jQeury](http://api.jquery.com/load/)