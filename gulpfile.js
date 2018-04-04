var gulp = require("gulp");                       // タスクランナー
var webserver = require('gulp-webserver');        // 簡易web server
var sass = require("gulp-sass");                  // scss用トランスパイラ
var autoprefixer = require("gulp-autoprefixer");  // ベンダープレフィックスの自動付与
var cleanCSS = require('gulp-clean-css');         // CSS圧縮
var plumber = require("gulp-plumber");            // gulpがエラー起こしても途中で止まらなくするやつ

var ps = require('child_process').exec;           // gulpからコマンドラインを叩くひと

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

gulp.task("build", ['scss'])
gulp.task("server", ['scss', 'webserver'])
