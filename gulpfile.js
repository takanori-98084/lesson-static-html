var gulp = require("gulp");                       // タスクランナー
var webserver = require('gulp-webserver');        // 簡易web server
var sass = require("gulp-sass");                  // scss用トランスパイラ
var autoprefixer = require("gulp-autoprefixer");  // ベンダープレフィックスの自動付与
var cleanCSS = require('gulp-clean-css');         // CSS圧縮
var plumber = require("gulp-plumber");            // gulpがエラー起こしても途中で止まらなくするやつ
var $ = require("gulp-load-plugins")();
var browserify = require("browserify");
var through2 = require("through2");

gulp.task('webserver', function() {
  gulp.src('./dest')
    .pipe(webserver({
      livereload: true, // 差分が発生したらリロードする
      open: true,       // サーバーが立ったら自動で開く
      port: 3002
    }));
});

gulp.task("scss", function() {
    gulp.src("./src/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dest"));
});

gulp.task('scss-watch', ['scss'], function(){
    var watcher = gulp.watch('./src/scss/**/*.scss', ['scss']);
    watcher.on('change', function(event) {
    });
});

gulp.task('js-watch', ['js'], function(){
    var watcher = gulp.watch('./src/js/*.js', ['js']);
    watcher.on('change', function(event) {
    });
});

gulp.task("js", function() {
    return gulp
        .src(["src/js/*.js"])
        .pipe(through2.obj(function(file, encode, callback) {
            browserify(file.path)
                .on("error", $.util.log)
                .bundle(function(err, res) {
                    if (err) {
                        $.util.log(err.message);
                        $.util.log(err.stack);
                    }
                    file.contents = res;
                    callback(null, file);
                });
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dest/js'));
});

gulp.task("build", ['scss', 'js']);
gulp.task("server", ['scss', 'js', 'scss-watch', 'js','webserver']);
