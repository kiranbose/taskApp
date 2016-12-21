var gulpPaths = {
    "bc": "./bower_components/",
    "nm" : "./node_modules/",
    "src": "./app/src/",
    "dist": "./dist/",
    "css": "./app/css/",
    "app": "./app/"
};


// ///////////////////////////////////////////////////////////////////
//  Required
// ///////////////////////////////////////////////////////////////////

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del');

// ///////////////////////////////////////////////////////////////////
//  Scripts Task
// ///////////////////////////////////////////////////////////////////

gulp.task('scripts',function(){
    console.log('scipts gulp task running');
     return gulp.src([
        gulpPaths.src + 'main.js',
        gulpPaths.src + '**/*.js'
    ])
    // gulp.src(['app/src/**/*.js','!app/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(gulpPaths.app + 'js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(gulpPaths.app + 'js/'))
        .pipe(reload({stream:true}));
});


// ///////////////////////////////////////////////////////////////////
//  Vendor Task
// ///////////////////////////////////////////////////////////////////

gulp.task('vendor', function () {
    console.log('vendor gulp task running');
    gulp.src([
            gulpPaths.bc + 'jquery/dist/jquery.js',
            gulpPaths.bc + 'angular/angular.js',
            gulpPaths.bc + 'angular-aria/angular-aria.js',
            gulpPaths.bc + 'angular-animate/angular-animate.js',
            gulpPaths.bc + 'angular-material/angular-material.js',
            gulpPaths.bc + 'angular-ui-router/release/angular-ui-router.js',
            gulpPaths.bc + 'angular-ui-tree/dist/angular-ui-tree.js',
            gulpPaths.bc + 'angular-animate/angular-animate.js',
        ])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(gulpPaths.app + '/js'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify({ output: { ascii_only: true } }))
        .pipe(gulp.dest(gulpPaths.app + '/js'));
    console.log('vendor gulp task finished');


    // Vendor CSS files concatenation
    console.log('vendor CSS gulp task running');
    gulp.src([
            gulpPaths.bc + 'angular-material/angular-material.css',
            gulpPaths.bc + 'angular-ui-tree/dist/angular-ui-tree.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(gulpPaths.app + '/css'))
        .pipe(rename('vendor.min.css'))
        .pipe(minifyCSS({processImport: false}))
        .pipe(gulp.dest(gulpPaths.app + '/css'));
    console.log('vendor CSS gulp task finished');
});

// ///////////////////////////////////////////////////////////////////
//  Compass/Sass Task
// ///////////////////////////////////////////////////////////////////
gulp.task('compass',function(){
    gulp.src(['app/scss/**/*.scss,app/scss/*.scss'])
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss',
            require: ['susy']
        }))
        .pipe(gulp.dest(gulpPaths.app + '/css'))
        .pipe(reload({stream:true}));
});


// ///////////////////////////////////////////////////////////////////
//  HTML Task
// ///////////////////////////////////////////////////////////////////

gulp.task('html',function(){
    gulp.src('app/**/*.html')
        .pipe(reload({stream:true}));
});

// ///////////////////////////////////////////////////////////////////
//  Build Task
// ///////////////////////////////////////////////////////////////////

gulp.task('build:cleanfolder',function(cb){
    return del([
        'build/**'
    ],cb);
});


gulp.task('build:copy',['build:cleanfolder'],function(){
    return gulp.src('app/**/*')
        .pipe(gulp.dest('build/'));
});

gulp.task('build:remove',['build:copy'],function(cb){
    del([
        'build/scss/',
        'build/js/**/!(*.min.js)',
        'build/src/'
    ],cb);
});

// Run the build task to create production build
gulp.task('build',['build:copy','build:remove']);


// ///////////////////////////////////////////////////////////////////
//  Browser Sync Task
// ///////////////////////////////////////////////////////////////////

gulp.task('browser-sync',function(){
    browserSync({
        server:{
            baseDir: "./app/"
        }
    })
});

gulp.task('build:server',function(){
    browserSync({
        server:{
            baseDir: "./build/"
        }
    })
});


gulp.task('bs-reload', function() {
    browserSync.reload();
});

// ///////////////////////////////////////////////////////////////////
//  Watch Task
// ///////////////////////////////////////////////////////////////////


gulp.task('watch',function(){
    gulp.watch([
        'app/scss/**/*.scss',
    ],['compass']);
    gulp.watch([
        'app/src/**/*.js',
    ],['scripts']);
});

// ///////////////////////////////////////////////////////////////////
//  Default Task
// ///////////////////////////////////////////////////////////////////


gulp.task('default',['vendor','compass','scripts','browser-sync','watch','html'],function(){
    gulp.watch(['app/css/*.css','app/js/*.js']).on("change", function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
        console.log("compass/scripts finished writing Files. Reloaded page.");
    });
    gulp.watch(['app/**/*.html'], ['bs-reload']);

});