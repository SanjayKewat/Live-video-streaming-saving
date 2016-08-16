



$(document).ready(function () {





    var $video, $box, $progress, $list;

    $video    = $('#video');
    $box      = $('#upload-box');
    $progress = $('#progress');
    $list     = $('#list');


    $video.attr({
        controls : true,
        autoplay : true

    });



    /*Once the connection is up, as denoted by the open event,
     add handling for video listings and Drag n' Drop.*/
    client.on('open', function () {
        video.list(setupList);

        $box.on('dragenter', fizzle);
        $box.on('dragover', fizzle);
        $box.on('drop', setupDragDrop);





    });

    client.on('stream', function (stream) {
        video.download(stream, function (err, src) {
            $video.attr('src', src);

        });
    });

    /*setupList refreshes the file listing visuals everytime a list request is sent.*/

    function setupList(err, files) {
        var $ul, $li;

        $list.empty();
        $ul   = $('<ul>').appendTo($list);

        files.forEach(function (file) {
            $li = $('<li>').appendTo($ul);
            $a  = $('<a>').appendTo($li);

            $a.attr('href', '#').text(file).click(function (e) {
                fizzle(e);

                var name = $(this).text();
                video.request(name);
            });
        });
    }

    /*setupDragDrop contains logic for dragging and dropping a file into the "drop" box (saw what I did there?),
     after which it initiates the upload of said file*/

    function setupDragDrop(e) {
        fizzle(e);

        var file, tx;

        file = e.originalEvent.dataTransfer.files[0];
        tx   = 0;

        video.upload(file, function (err, data) {
            var msg;

            if (data.end) {
                msg = "Upload complete: " + file.name;

                video.list(setupList);
            } else if (data.rx) {
                msg = Math.round(tx += data.rx * 100) + '% complete';

            } else {
                // assume error
                msg = data.err;
            }

            $progress.text(msg);

            if (data.end || data.err) {
                setTimeout(function () {
                    $progress.fadeOut(function () {
                        $progress.text('Drop file here');
                    }).fadeIn();
                }, 5000);
            }
        });


    }


    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }



//Get Video Duration

    var vid, playbtn, seekslider, curtimetext, durtimetext;
    function intializePlayer(){
        // Set object references
        vid = document.getElementById("video");
        playbtn = document.getElementById("playpausebtn");
        seekslider = document.getElementById("seekslider");
        curtimetext = document.getElementById("curtimetext");
        durtimetext = document.getElementById("durtimetext");
        // Add event listeners
        playbtn.addEventListener("click",playPause,false);
        seekslider.addEventListener("change",vidSeek,false);
        vid.addEventListener("timeupdate",seektimeupdate,false);
    }
    window.onload = intializePlayer;
    function playPause(){
        if(vid.paused){
            vid.play();
            playbtn.innerHTML = "Pause";
        } else {
            vid.pause();
            playbtn.innerHTML = "Play";
        }
    }
    function vidSeek(){
        var seekto = vid.duration * (seekslider.value / 100);
        vid.currentTime = seekto;
    }
    function seektimeupdate(){
        var nt = vid.currentTime * (100 / vid.duration);
        seekslider.value = nt;
        var curmins = Math.floor(vid.currentTime / 60);
        var cursecs = Math.floor(vid.currentTime - curmins * 60);
        var durmins = Math.floor(vid.duration / 60);
        var dursecs = Math.floor(vid.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }

});

