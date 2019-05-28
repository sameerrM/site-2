var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// Main folders
var src = 'resources/assets/';
var dest = 'public/assets/';
var fontName = 'icons';
// Plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'js/*.js')
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'js'));
});

// Compile CSS from SASS
gulp.task('sass', function() {
    return gulp.src(src + 'sass/app.scss')
    // .pipe(autoprefixer({
    //     browsers: ['last 2 versions'],
    //     cascade: false
    // }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'css'))
});

// Creating fonts and css for vector icons
gulp.task('iconfont', function(){
    gulp.src([src + 'icons/*.svg'], {base: 'resources'})
        .pipe(plugins.iconfontCss({
            fontName: fontName,
            targetPath: '../../../resources/assets/sass/icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(plugins.iconfont({
            fontName:         'icons',
            formats:          ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            appendCodepoints: true,
            normalize:        true,
            descent:          20,
            fontHeight:       100,
            timestamp:        0
        }))
        .on('glyphs', function(glyphs, options) {
            console.log(glyphs, options);
        })
        .pipe(gulp.dest(dest + 'fonts'));
});

// Running tasks
gulp.task('watch', function() {
    gulp.watch(src + 'js/*.js', ['scripts']);
    gulp.watch(src + 'sass/*.scss', ['sass']);
    gulp.watch(src + 'icons/**/*', ['iconfont']);
});

// Main Task
gulp.task('default', ['scripts', 'sass', 'iconfont', 'watch']);
