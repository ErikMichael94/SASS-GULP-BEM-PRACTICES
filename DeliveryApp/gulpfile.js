// para instalar localmente en el proyecto utilizamos *** npm i --save-dev gulp  ***
// para crear el archivo package.json utilizamos *** npm init  **
// para instalar sass y gulp sass en el proyecto usamos ****  npm i --save-dev sass gulp-sass  *** 
// para instalar compresor de imagenes ***  npm i --save-dev gulp-imagemin  ***
// actualmente para IMAGEMIN hay que usar  **  npm install --save-dev gulp-imagemin@7.0.0  **
// para cambiar a formatos compatibles  ***  npm i --save-dev gulp-avif  /  gulp-avif  ***
// instalar sourcemaps para ubicar líneas de cssnpm i --save-dev gulp-sourcemaps
// instalar css nano para optimizar lineas repetidas ***  npm i --save-dev cssnano  ***


// importamos módulos de gulp con (los encontraremos en el package.json )
//  const { aqui ponemos varias funciones que exportar}
// {src} indentifica archivos (ubicación hoja de archivos de sass)
// {sass} = interpreta el compilador
// {gulp-sass} = link entre el gulpfile y sass


const {src, dest, watch, series, parallel } = require ('gulp');

// CSS Y SASS
const sass = require ('gulp-sass')(require('sass'));
const postcss = require ('gulp-postcss');
const autoprefixer = require ('autoprefixer');
const sourcemaps = require  ('gulp-sourcemaps')
const cssnano = require ('cssnano');
//IMAGEMIN
const imagemin = require ('gulp-imagemin');
const webp = require ('gulp-webp');
const avif = require ('gulp-avif');

function css(done) {
    // compilar sass
    // 1º identificar archivo 2º compilarlo y por último guardar el .css
    src ('src/scss/app.scss')
    //aplicar el sourcemaps
    .pipe (sourcemaps.init())
    // .pipe comienza otra tarea y llama a sass para compilar la hoja de estilos 
    .pipe(sass ({outputStyle:'expanded'}))
    //¡¡¡¡¡IMPORTANTE!!!!  css nano está comentado para no ptimizar el codigo 
    .pipe(postcss([autoprefixer()/*,cssnano()*/]))   
    //escribimos en el archivo el sourcemap
    .pipe(sourcemaps.write('.'))
    // almacenamos la hoja de estilos compilada
        .pipe (dest ('build/css') )


    done ();
    
}

// no llamar a una funcion igual a un módulo de gulp 

function dev()  {
    //watch -> atento a lo que pase a este archivo 
    // **comodin de carpeta * comodin de archivo
    watch ('src/scss/**/*.scss',css);
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )

}

function versionWebp() {
    return src ('src/img/**/*.{jpg,png}')
        .pipe ( webp())
        .pipe ( dest('build/img'))
} 

function versionAvif() {
    const opciones = {
        quaility: 50
    }
    return src ('src/img/**/*.{jpg,png}')
        .pipe ( avif())
        .pipe ( dest('build/img'))
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//series encadena tareas y parallel las ejecuta a la vez //
exports.default =  series (imagenes, versionWebp, versionAvif, css, dev);