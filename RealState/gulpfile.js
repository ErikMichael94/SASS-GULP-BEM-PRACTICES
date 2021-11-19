// para instalar localmente en el proyecto utilizamos *** npm i --save-dev gulp  ***
// para crear el archivo package.json utilizamos *** npm init  **
// para instalar sass y gulp sass en el proyecto usamos ****  npm i --save-dev sass gulp-sass  *** 
// para instalar postcss *** npm i --save-dev gulp-postcss ***
// para instalar autoprefixer ***  npm i --save-dev autoprefixer   ***
// para instalar compresor de imagenes ***  npm i --save-dev gulp-imagemin  ***
// actualmente para IMAGEMIN hay que usar  **  npm install --save-dev gulp-imagemin@7.0.0  **
// para cambiar a formatos compatibles  ***  npm i --save-dev gulp-avif gulp-webp  ***
// instalar sourcemaps para ubicar líneas de css *** npm i --save-dev gulp-sourcemaps  ***
// instalar css nano para optimizar lineas repetidas ***  npm i --save-dev cssnano  ***

// ******** RECUERDA CREAR CARPETAS Y ARCHIVO APP.SCSS *********************

// importamos módulos de gulp con (los encontraremos en el package.json )
//  const { aqui ponemos varias funciones que exportar}
// {src} indentifica archivos (ubicación hoja de archivos de sass)
// {sass} = interpreta el compilador
// {gulp-sass} = link entre el gulpfile y sass



const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer()/*, cssnano() */ ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img'))
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev  );