var gulp = require('gulp');


var exec = require('child_process').exec;

gulp.task('build', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

 
gulp.task('default', function(){
   console.log('build done with success'); 
});
 