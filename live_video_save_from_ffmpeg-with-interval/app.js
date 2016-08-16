
/**
 * Module dependencies.
 */
'use strict';
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var l_video= require('./live_video');
var app = express();
var BinaryServer = require('binaryjs').BinaryServer;
var video        = require('./lib/video');
var bs;


// all environments
app.set('port', process.env.PORT || 1000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');         // here is code to specify the html page directory
app.engine('html', require('ejs').renderFile);  //render html using ejs module



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//start here streaming save video
bs = new BinaryServer({ port: 9000 });

bs.on('connection', function (client) {
    client.on('stream', function (stream, meta) {
        switch(meta.event) {
            // list available videos
            case 'list':
                video.list(stream, meta);
                break;

            // request for a video
            case 'request':
                video.request(client, meta);
                break;

            // attempt an upload
            case 'upload':
            default:
                video.upload(stream, meta);
        }
    });
});

//end here streaming save video

app.get('/',function(req,res){
    res.render('live_video.html');
});
app.get('/users', user.list);
//app.get('/start/:code/:hr/:min/:sec', l_video.start);
app.get('/start/:code/:min', l_video.start);




app.get('/viewstream',function(req,res){
    res.render('stream_vds.html');
});

app.get('/get_dr',function(req,res){
  res.render('get_duratn_frm_stream.html');
});

//showing information of current process
process.argv.forEach(function(arg,idx){
    console.log("argv["+idx+"]= "+arg);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
