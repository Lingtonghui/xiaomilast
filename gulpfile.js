/*
    第三方插件
    gulp-scss
    gulp-minify-css
    gulp-rename

*/

const gulp=require("gulp");
const scss=require("gulp-sass");
const minifyCss=require("gulp-minify-css");
const rename=require("gulp-rename");




//one task(把scss文件=>css文件 =>压缩 => min.css)

/* 
    index.scss => index.css => index.min.css 
    单文件处理
*/
gulp.task("scss",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})


/*
    批量处理scss

    但是重命名必须一个文件对应一个任务
*/


gulp.task("scssAll",function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})




//two task 处理   .js


gulp.task("scripts",function(){
    return  gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})


// three task  处理 .html文件


gulp.task("copyHtml",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})


//four task  处理 .json数据

gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
    .pipe(connect.reload())

})


//five task  处理图片

gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})



//multi tasking  executive


gulp.task("build",["scss","scripts","images","data","copyHtml","scssAll"],function(){
    console.log("son of bitch")
    
})


//watch all files


gulp.task("watch",function(){
    gulp.watch("stylesheet/index.scss",["scss"])
    gulp.watch("stylesheet/*.scss",["scssAll"])
    gulp.watch(["*.js","!gulpfile.js"],["scripts"])
    gulp.watch("*.html",["copyHtml"])
    gulp.watch(["*.json","!package.json"],["data"])
    gulp.watch("images/**/*",["images"])
})


//six task 启动一个服务器   gulp-connect 


const connect =require("gulp-connect");



gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})



//default task

gulp.task("default",["watch","server"])


