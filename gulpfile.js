import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import browser from 'browser-sync';
import webpack from 'webpack-stream'

const SOURCE_FOLDER = 'source';
const PUBLIC_FOLDER = 'public';

// HTML
export const html = () => {
  return gulp.src(`${SOURCE_FOLDER}/*.html`)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest(PUBLIC_FOLDER))
  .pipe(browser.stream());
}

// Styles
export const styles = () => {
  return gulp.src(`${SOURCE_FOLDER}/less/style.less`, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/css`))
    .pipe(browser.stream());
}

// Scripts
export const scripts = () => {
  return gulp.src(`${SOURCE_FOLDER}/js/*.js`)
    .pipe(webpack({
      mode: 'development',
      devtool: 'source-map',
      output: {
          filename: 'app.min.js',
      }
    }))
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/js`))
    .pipe(browser.stream());
}

// Images
// export const optimizeImages = () => {
//   return gulp.src([
//     `${SOURCE_FOLDER}/img/**/*.{png,jpg,svg}`,
//     `!${SOURCE_FOLDER}/img/sprite/*`
//   ])
//     .pipe(imagemin())
//     .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`));
// }

export const optimizeImages = () => {
  return gulp.src([
    `${SOURCE_FOLDER}/img/**/*.svg`,
    `!${SOURCE_FOLDER}/img/sprite/*`
  ])
    .pipe(imagemin())
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`));
}

export const copyImages = () => {
  return gulp.src([
    `${SOURCE_FOLDER}/img/**/*.svg`,
    `!${SOURCE_FOLDER}/img/sprite/*`
  ])
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`));
}

// export const copyImages = () => {
//   return gulp.src([
//     `${SOURCE_FOLDER}/img/**/*.{png,jpg,svg}`,
//     `!${SOURCE_FOLDER}/img/sprite/*`
//   ])
//     .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`));
// }

export const createWebp = () => {
  return gulp.src([
    `${SOURCE_FOLDER}/img/**/*.{jpg,png}`,
    `!${SOURCE_FOLDER}/img/favicons/*`
  ])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`))
}

export const createSprite = () => {
  return gulp.src(`${SOURCE_FOLDER}/img/sprite/*.svg`)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(`${PUBLIC_FOLDER}/img`));
}

// Copy
export const copy = (done) => {
  gulp.src([
    `${SOURCE_FOLDER}/fonts/*.*`,
    `${SOURCE_FOLDER}/swiper/*.min.*`
  ], {
    base: `${SOURCE_FOLDER}`
  })
    .pipe(gulp.dest(PUBLIC_FOLDER))
  done();
}

// Clean
export const clean = () => {
  return deleteAsync(PUBLIC_FOLDER);
};

// Server
export const server = (done) => {
  browser.init({
    server: {
      baseDir: PUBLIC_FOLDER
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher
const watcher = () => {
  gulp.watch(`${SOURCE_FOLDER}/less/**/*.less`, gulp.series(styles));
  gulp.watch(`${SOURCE_FOLDER}/js/*.js`, gulp.series(scripts));
  gulp.watch(`${SOURCE_FOLDER}/*.html`, gulp.series(html));
}

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,

  gulp.parallel(
    styles,
    html,
    scripts,
    createSprite,
    createWebp,
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImages,

  gulp.parallel(
    styles,
    html,
    scripts,
    createSprite,
    createWebp,
  ),

  gulp.series(
    server,
    watcher
  ),
);
