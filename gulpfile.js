var gulp = require("gulp");                       // タスクランナー
var browserSync = require('browser-sync');
var sass = require("gulp-sass");                  // scss用トランスパイラ
var autoprefixer = require("gulp-autoprefixer");  // ベンダープレフィックスの自動付与
var cleanCSS = require('gulp-clean-css');         // CSS圧縮
var plumber = require("gulp-plumber");            // gulpがエラー起こしても途中で止まらなくするやつ
var $ = require("gulp-load-plugins")();
var browserify = require("browserify");
var through2 = require("through2");

gulp.task('browser-sync', () => {
    return browserSync({
      server: {
           baseDir: "./dest"       //ルートディレクトリ
          ,index  : "index.html"   //インデックスファイル
      },  
      open: 'external',
      open: 3000
  }); 
});

gulp.task('bs-reload', () => {
    browserSync.reload();
});

gulp.task("scss", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dest"));
});

gulp.task("js", () => {
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

gulp.task('watch', () => {
  gulp.watch("./src/**/*.js", gulp.task('js'));
  gulp.watch("./src/scss/**/*.scss", gulp.task('scss'));
  gulp.watch(['./dest/**/*.html', './dest/**/*.css', './dest/**/*.js'], gulp.task('bs-reload'));
});

gulp.task("build", gulp.series( gulp.parallel('scss', 'js')));
gulp.task("server", gulp.series( gulp.parallel('browser-sync', 'watch')));
