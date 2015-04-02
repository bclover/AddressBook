var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var filter = require('gulp-filter');
var browserSync = require("browser-sync");
var reload = browserSync.reload;


// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
    gulp.watch("src/styles/**/*.css").on("change", browserSync.reload);
});

gulp.task('default', ['serve']);