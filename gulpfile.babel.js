// NOTE: make sure you have gulp 3.9.0 or above

import gulp from 'gulp';
const $ = require('gulp-load-plugins')();

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

// production building
gulp.task('webpack', (cb) => {
  webpack(require('./webpack.config.js'), (err, stats) => {
    if(err) {
      throw new $.util.PluginError('webpack', err);
    }
    $.util.log('[webpack]', stats.toString());
    cb();
  });
});

// development server
const DEV_SERVER = 8080;
gulp.task('webpack-dev-server', () => {
  const compiler = webpack(require('./webpack.config.js'));

  new WebpackDevServer(compiler, {
    // Put in dev server config here
  })
    .listen(DEV_SERVER, 'localhost', (err) => {
      if(err) {
        throw new $.util.PluginError('webpack-dev-server', err);
      }
      $.util.log('[webpack-dev-server]', `http://localhost:${DEV_SERVER}/webpack-dev-server/index.html`);
    });
});

const dirs = {
  src: 'src',
  dest: 'dist'
};

const staticfiles = ['src/index.html'];

//
gulp.task('copy-static', () =>
  gulp.src(staticfiles)
    .pipe($.changed(dirs.dest))
    .pipe(gulp.dest(dirs.dest))
);

gulp.task('dev', ['webpack-dev-server', 'copy-static'], () => {
  gulp.watch(staticfiles, ['copy-static']);
});
