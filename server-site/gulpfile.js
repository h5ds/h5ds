const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');

gulp.task('copy', () => {
    return gulp.src([
        'src/**/*'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', done => {
    devServer.listen({ path: './dist/index.js' }, err => err && console.error(err));
    done();
});

gulp.task('restart', done => {
    devServer.restart(err => {
        err && console.error(err);
    });
    notifier.notify({
        title: 'Notify',
        sound: true,
        message: 'Server restart successfully.'
    });
    done();
});

gulp.task('watch', done => {
    gulp.watch([
        'src/**/*',
    ], gulp.series('copy', 'restart'));
    done();
});

gulp.task('default', gulp.series('copy', 'serve', 'watch'));
