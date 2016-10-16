var gulp = require('gulp'),
	sass = require('gulp-sass'), 
	csso = require('gulp-csso'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger');

gulp.task('sass', function () {
	gulp.src('./sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../public/css'));
});

gulp.task('js', function() {
	gulp.src(['./js/**/*.js', '!./js/**/_*.js'])
		.pipe(rigger())
		.pipe(gulp.dest('../public/js'));
});

gulp.task('fonts', function() {
	gulp.src('./fonts/**/*')
		.pipe(gulp.dest('../public/fonts'));
});

gulp.task('watch', function() {
	gulp.start('sass');
	gulp.start('js');
	//gulp.start('fonts');
	
	gulp.watch('./sass/**/*.scss', function() {
		gulp.start('sass');
	});
	gulp.watch('./js/**/*.js', function() {
		gulp.start('js');
	});
});

gulp.task('build', function() {
	gulp.src('./sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest('../public/css'));
	gulp.src(['./js/**/*.js', '!./js/**/_*.js'])
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest('../public/js'));
//	gulp.src('./fonts/**/*')
//		.pipe(gulp.dest('../public/fonts'));
});

