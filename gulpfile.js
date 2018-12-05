var gulp        = require('gulp');
// var deploy      = require('gulp-gh-pages');

// /**
//  * Push build to gh-pages
//  */
// gulp.task('deploy', function () {
//   return gulp.src("./dist/**/*")
//     .pipe(deploy())
// });

var ghpages = require('gh-pages'),
    path = require('path');

gulp.task('deploy', function(cb) {
ghpages.publish(path.join(process.cwd(), 'dist'), cb);
});