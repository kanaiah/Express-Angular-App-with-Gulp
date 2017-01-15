var gulp = require('gulp');
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
var closureCompiler = require('google-closure-compiler').gulp();
var print = require('gulp-print');
var glob = require("glob");
var argv = require('yargs').argv,
    gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");

var isProduction = argv.production ? true : false;
var shouldMinify = argv.minify || isProduction;
var shouldConcatenate = argv.concatenate || shouldMinify || isProduction;

console.log("Production: " + isProduction + ", Minify: " + shouldMinify + ", Concatenate: " + shouldConcatenate);

var build_dir = "build";
var src = {
    scripts: ['public/js/**/*.js'],
    styles: ['public/css/**/*.css'],
    modules: './node_modules/**',
    angular_modules: './node_modules/angular*/*.min.js',
    material_icons_fonts: [
        './node_modules/material-design-icons/iconfont/*.woff',
        './node_modules/material-design-icons/iconfont/*.woff2',
        './node_modules/material-design-icons/iconfont/*.ttf'
    ],
    views: ['public/views/**/*.html'],
    html: 'public/**/*.html',
    images: 'public/img/**/*'
};

var dest_paths = {
    scripts: build_dir + '/js',
    styles: build_dir + '/css',
    images: build_dir + '/img',
    html: build_dir + '/',
    views: build_dir + '/views',
    angular_modules: build_dir + '/node_modules',
    material_icons_fonts: build_dir + '/fonts'
};

var js_file_name = 'app.min.js';

gulp.task('clean', function() {
    return del.sync([build_dir + '/**']);
});

gulp.task('clean-css', function() {
    return del.sync([dest_paths.styles + '/**']);
});

gulp.task('clean-js', function() {
    return del.sync([dest_paths.scripts + '/**']);
});


// If shouldMinify = false, copy all the files
gulp.task('copy-html', function() {
    return gulp.src(src.html)
        .pipe(gulp.dest(dest_paths.html));
});

gulp.task('copy-angular-modules', function() {
    return gulp.src(src.angular_modules)
        .pipe(gulp.dest(dest_paths.angular_modules));
});

gulp.task('copy-js', function() {
    return gulp.src(src.scripts)
        .pipe(gulp.dest(dest_paths.scripts));
});

gulp.task('copy-css', function() {
    return gulp.src(src.styles)
        .pipe(gulp.dest(dest_paths.styles));
});

gulp.task('copy-images', function() {
    return gulp.src(src.images)
        .pipe(gulp.dest(dest_paths.images));
});

gulp.task('copy-fonts', function() {
    return gulp.src(src.material_icons_fonts).pipe(print())
        .pipe(gulp.dest(dest_paths.material_icons_fonts));
});

gulp.task('copy-views', function() {
    return gulp.src(src.views)
        .pipe(gulp.dest(dest_paths.views));
});


//update the tags and concatenate the js, css, library files
gulp.task('update-rev-concatenate', function(done) {
    if (shouldMinify || shouldConcatenate) {
        var stream = gulp.src(src.html)
            .pipe(useref())
            .pipe(gulp.dest(dest_paths.html));
        stream.on('end', function() {
            //run some code here
            console.log("update rev done");
            done();
        });
        stream.on('error', function(err) {
            console.log("update rev error");
            done(err);
        });
    } else {
        console.log("Copying files..");
        runSequence('copy-html', 'copy-js', 'copy-css', 'copy-angular-modules', function(done) {
            done();
        });
    }
});

gulp.task('minify-js', function(done) {
    if (shouldMinify) {
        glob(src.angular_modules, function(er, files) {
            var optimization_level = 'SIMPLE';
            if (isProduction)
                optimization_level = 'SIMPLE';
            // ADVANCED_OPTIMIZATIONS - Changes the scope variable names. Need to explore on how overcome this
            // optimization_level = 'ADVANCED_OPTIMIZATIONS';
            var options = {
                compilation_level: optimization_level,
                output_wrapper: '(function(){\n%output%\n}).call(this)',
                js_output_file: js_file_name,
                language_in: 'ECMASCRIPT6_STRICT',
                language_out: 'ECMASCRIPT5_STRICT',
                warning_level: 'QUIET',
                angular_pass: true,
                apply_input_source_maps: true
            };
            if (isProduction) {
                options.externs = files;
                options.create_source_map = true;
            }
            var stream = gulp.src([dest_paths.scripts + "/app.min.js"])
                .pipe(gulpif(!isProduction, sourcemaps.init()))
                .pipe(closureCompiler(options))
                .pipe(gulpif(!isProduction, sourcemaps.write('/')))
                .pipe(gulp.dest(dest_paths.scripts));
            stream.on('end', function() {
                //run some code here
                console.log("minify js done");
                done();
            });
            stream.on('error', function(err) {
                console.log("minify js error");
                done(err);
            });
        });
    } else {
        console.log("Not minifying js..");
        done();
    }
});

gulp.task('minify-css', function() {
    if (shouldMinify) {
        return gulp.src(src.styles)
            .pipe(cleanCSS({
                debug: true
            }, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(concat("app.min.css"))
            .pipe(gulp.dest(dest_paths.styles));
    } else {
        console.log("Not minifying css..");
    }
});


//additional task to just concatenate files
gulp.task('concatenate', function(done) {
    runSequence('clean', 'update-rev-concatenate', 'copy-images', function() {
        done();
    });
});

//additional task to concatenate & minify files
gulp.task('minify', function(done) {
    runSequence('clean', 'update-rev-concatenate', 'minify-js', 'minify-css', 'copy-views', 'copy-images', 'copy-fonts', 'revision-js', 'revision-css', function() {
        done();
    });
});

gulp.task('watch', function() {
    if (!isProduction) {
        gulp.watch(src.styles, ['minify']);
        gulp.watch(src.scripts, ['minify']);
        gulp.watch(src.html, ['minify']);
    }
});

gulp.task('default', function(done) {
    runSequence('minify', 'watch', function() {
        done();
    });
});

gulp.task("revision-css", function(done) {
    var stream = gulp.src(dest_paths.styles + "/*.css")
        .pipe(rev())
        .pipe(gulp.dest(dest_paths.styles))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dest_paths.styles));
    stream.on('end', function() {
        //run some code here
        console.log("revision css done");
        done();
    });
    stream.on('error', function(err) {
        console.log("revision css error");
        done(err);
    });
});

gulp.task("revision-css", function(done) {
    var stream = gulp.src(dest_paths.styles + "/*.css")
        .pipe(rev())
        .pipe(gulp.dest(dest_paths.styles))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dest_paths.styles));
    stream.on('end', function() {
        //run some code here
        console.log("revision css done");
        var manifest = gulp.src("./" + dest_paths.styles + "/rev-manifest.json");

        var replace_stream = gulp.src(dest_paths.html + "/*.html")
            .pipe(revReplace({
                manifest: manifest
            }))
            .pipe(gulp.dest(dest_paths.html));
        replace_stream.on('end', function() {
            //run some code here
            console.log("replace css done");
            done();
        });
        replace_stream.on('error', function(err) {
            console.log("replace css error");
            done(err);
        });
    });
    stream.on('error', function(err) {
        console.log("revision css error");
        done(err);
    });
});

gulp.task("revision-js", function(done) {
    var stream = gulp.src(dest_paths.scripts + "/*.js")
        .pipe(rev())
        .pipe(gulp.dest(dest_paths.scripts))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dest_paths.scripts));
    stream.on('end', function() {
        //run some code here
        console.log("revision js done");
        var manifest = gulp.src("./" + dest_paths.scripts + "/rev-manifest.json");

        var replace_stream = gulp.src(dest_paths.html + "/*.html")
            .pipe(revReplace({
                manifest: manifest
            }))
            .pipe(gulp.dest(dest_paths.html));
        replace_stream.on('end', function() {
            //run some code here
            console.log("replace js done");
            done();
        });
        replace_stream.on('error', function(err) {
            console.log("replace js error");
            done(err);
        });
    });
    stream.on('error', function(err) {
        console.log("revision js error");
        done(err);
    });
});



// gulp.task('watch', function() {
//     console.log("updating output");
//     gulp.watch(, ['scripts']);
// });




// gulp.task('concatenate-js', function() {
//     return gulp.src(src.scripts)
//         .pipe(concat(js_file_name))
//         .pipe(gulp.dest(dest_paths.scripts));
// });
//
// gulp.task('concatenate', ['concatenate-js']);




// gulp.task('lib-js', function() {
//     //return gulp.src(paths.scripts)
// //	.pipe(concat('app.min.js'))
// //	.pipe(gulp.dest(dest_paths.scripts))i;
// 	return gulp.src('index.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });
