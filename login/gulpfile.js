var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var series = require('stream-series');

gulp.task('dev',['bowerfiles'],function(){
	return gulp.src('./index.cfm')
		.pipe($.inject(
			series(
				gulp.src('./src/lib/jquery/**/*.js',{read:false}),
				gulp.src(['./src/lib/**/*.js','!src/lib/jquery/**/*.js']),
				gulp.src('./src/lib/**/*.css',{read:false}),
				gulp.src('./src/kendo/**/*.js',{read:false}),
				gulp.src('./src/kendo/**/*.css',{read:false})
			),
			{
				relative:true,
				starttag:'<!-- inject:lib:{{ext}} -->'
			}
		))
		.pipe(gulp.dest('.'));
});

gulp.task('bowerfiles',function(){
	return gulp.src('./bower.json')
		.pipe($.mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/bootstrap.css',
                        './dist/fonts/*.*'
                    ]
                }
            }
        }))
		.pipe(gulp.dest('src/lib'));
});

gulp.task('prod',['cleandist','fonts'],function(){
	var assets = $.useref.assets({searchPath:''});
	return gulp.src('./index.cfm')
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss()))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('.'));
});

gulp.task('cleandist',function(){
	return gulp.src('./dist',{read:false})
		.pipe($.clean());
});

gulp.task('fonts',function(){
	return gulp.src('./src/lib/**/*.{ttf,woff,woff2,eof,eot,svg}')
		.pipe($.flatten())
		.pipe(gulp.dest('./dist/fonts'));
});

/////////////////////////////////
// Default will list all tasks
gulp.task('default', $.taskListing);

/////////////////////////////////
