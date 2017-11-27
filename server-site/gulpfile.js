const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');
const lightReload = require('light-reload');
lightReload.init();

gulp.task('copy', () => {
    return gulp.src([
        'src/**/*'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:h5ds', () => {
    return gulp.src([
        '../core/dist/**/*'
    ])
        .pipe(gulp.dest('dist/assets'));
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
    gulp.watch([
        '../core/dist/**/*'
    ], gulp.series('copy:h5ds', done => {
        lightReload.reload();
        done();
    }));
    done();
});

gulp.task('default', gulp.series('copy', 'copy:h5ds', 'serve', 'watch'));
