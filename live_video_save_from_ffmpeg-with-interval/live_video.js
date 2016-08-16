/**
 * Created by Administrator on 2/11/2015.
 */

//var child_process = require('child_process');
var path = require('path');
var exec = require('child_process').exec;
var childProcess=require('child_process');
var psTree = require('ps-tree');

// If the child process accepts arguments, they go here.
var childArguments = [];
var child=[];
var a=1;
/*//Code Record whole video(mp4) using ffmpeg
exports.start= function(req, res){
    var code=req.param('code');
//    var hr=req.param('hr');
    var min=req.param('min');
//    var sec=req.param('sec');

    var date = new Date();
    var year = date.getFullYear();

    year = year.toString().substr(2,2);
//           fileName = getRandomString();
    fileName='d_'+date.getDate()+'m_'+(date.getMonth()+1)+'y_'+year+'h_'+date.getHours()+'mi_'+date.getMinutes()+'s_'+date.getSeconds();
 gc v
    //here define ffmpeg cmd generate mp4 file.
    //Define time in hour
    //var cmd='ffmpeg -i rtsp://169.254.22.166:554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:00 -t '+hr+':'+min+':'+sec+' -async 1 '+__dirname+'/videos/'+fileName+'.mp4';

//    Define minutes
    var cmd='ffmpeg -i rtsp://169.254.22.166:554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:00 -t 00:'+min+':00 -async 1 '+__dirname+'/videos/'+fileName+'.mp4';

    // Listen for messages from the child process.
    if(code==1){
        console.log(process.cwd());//display current directory

        child = exec(cmd);
        child.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        });
        child.stderr.on('data', function(data) {
            console.log('stdout: ' + data);
        });
        child.on('exit', function(code, signal) {
            console.log('child process terminated due to receipt of signal '+signal);
        });



        console.log('This process is pid ' + process.pid);
        console.log('This Child process is pid ' + child.pid);

        console.log('Recording Start');
        res.send('Video Processing started.')
    }

//Code 2 used for killing child process
    else if(code==2){

//        child.kill('SIGINT');//works
//    child.kill("SIGTERM"); //works
//      child.kill('SIGUSR1');
//        child.kill("SIGHUP");
//child.kill();
//        child.kill(child.pid,SIGINT);
        child.kill('SIGTERM');
        res.send('Stop Process.');
    }




};*/


//Code Record video(mp4) specific interval using ffmpeg
exports.start= function(req, res){
    var ip_add='169.254.22.166';
    var code=req.param('code');
//    var hr=req.param('hr');
    var min=req.param('min');
//    var sec=req.param('sec');
    var video_intrvl=5; // define video interval in minutes
    var rotation=min/video_intrvl;//calculate total no. of video created.
     var tot_rot=Math.ceil(rotation);//covert total no. of video created into exact number of video (ex:after divided min. get (1.2) Math.ceil() convert into 3).
//   console.log('R :'+rotation);

    var sec=video_intrvl*60; //here calculate total seconds
    var totmi_sec=sec*1000; //here calculate total mili seconds
    console.log('Total video created : '+tot_rot +' Total milisec '+totmi_sec);

    if(code==1){

        //Start Execute code first time when waiting for start video interval(define below).
        var date = new Date();
        var year = date.getFullYear();

        year = year.toString().substr(2, 2);
        fileName = 'd_' + date.getDate() + 'm_' + (date.getMonth() + 1) + 'y_' + year + 'h_' + date.getHours() + 'mi_' + date.getMinutes() + 's_' + date.getSeconds();

        //here define ffmpeg cmd generate mp4 file.
        //    Define minutes
                var cmd = 'ffmpeg -i rtsp://' + ip_add + ':554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:0 -t 00:'+video_intrvl+':00 -async 1 ' + __dirname + '/videos/' + fileName + '.mp4';
//        var cmd = 'ffmpeg -i rtsp://' + ip_add + ':554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:0 -t 00:00:15 -async 1 ' + __dirname + '/videos/' + fileName + '.mp4';

        console.log(' video processing start');
        child = exec(cmd);
        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child.stderr.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child.on('exit', function (code, signal) {
            console.log('child process terminated due to receipt of signal ' + signal);
            console.log(' video created successfully.');
        });
        //End Execute code first time when waiting for start video interval(define below).

        (function theLoop (i) {
            setTimeout(function () {

            if(i>0) { //check no. of process not less then 0.
                console.log(a + " Cheese!");//logic code goes here
                var date = new Date();
                var year = date.getFullYear();

                year = year.toString().substr(2, 2);
                fileName = 'd_' + date.getDate() + 'm_' + (date.getMonth() + 1) + 'y_' + year + 'h_' + date.getHours() + 'mi_' + date.getMinutes() + 's_' + date.getSeconds();

                //here define ffmpeg cmd generate mp4 file.
                //    Define minutes
                var cmd = 'ffmpeg -i rtsp://' + ip_add + ':554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:0 -t 00:'+video_intrvl+':00 -async 1 ' + __dirname + '/videos/' + fileName + '.mp4';
//                var cmd = 'ffmpeg -i rtsp://' + ip_add + ':554/axis-media/media.amp -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -preset slower -crf 18 -vf "scale=trunc(in_w/2)*2:trunc(in_h/2)*2" -ss 00:00:0 -t 00:00:15 -async 1 ' + __dirname + '/videos/' + fileName + '.mp4';

                console.log(i + ' video processing start');
                child = exec(cmd);
                child.stdout.on('data', function (data) {
                    console.log('stdout: ' + data);
                });
                child.stderr.on('data', function (data) {
                    console.log('stdout: ' + data);
                });
                child.on('exit', function (code, signal) {
                    console.log('child process terminated due to receipt of signal ' + signal);
                    console.log(i + ' video created successfully.');
                });
                if (--i) {          // If i > 0, keep going
                    theLoop(i);       // Call the loop again, and pass it the current value of i

                }
            }
            }, totmi_sec);
        })(tot_rot-1);//here -1 bcoz Ist process start above then rest of process start here.

        console.log('Recording Start');
        res.send('Video Processing started.');
    }



//Code 2 used for killing child process
    else if(code==2){

//        child.kill('SIGINT');//works
//    child.kill("SIGTERM"); //works
//      child.kill('SIGUSR1');
//        child.kill("SIGHUP");
//child.kill();
//        child.kill(child.pid,SIGINT);
        child.kill('SIGTERM');
        res.send('Stop Process.');
    }




};
