$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: OC.generateUrl('/apps/videos/api/get_videos'),
        success: function (data) {
            var videos = data.videos;
            console.log(videos);
            if (videos.length == 0) {
                $('#emptycontent').css('display', 'block');
                $('#emptymsg').css('display', 'block');
            }
            videos.forEach(function (video) {
                var item = $('<div></div>');
                item.attr('data-size',video.size);
                item.attr('data-mime',video.mimetype);
                item.attr('data-file',video.name);
                item.attr('data-id',video.fileid);
                item.attr('data-path',video.path);
                item.addClass('video-item');


                var shade, shade_src;

                // if the mimetype is not supported
                if (videoViewer.mimeTypes.indexOf(video.mimetype) == -1) {
                    shade_src = OC.webroot + '/apps/videos/img/video-download.png';
                    shade = $('<div><img style="width: 60px;margin: 40px auto 0 auto;cursor: pointer" src="'
                        + shade_src + '"/></div>');
                    shade.click(function () {
                        window.open (OC.webroot + '/index.php/apps/files/download/'+video.path)
                    });
                } else {
                    // if the mimetype is supported, trigger `file_videoplayer`
                    shade_src = OC.webroot + '/apps/videos/img/video-play.png';
                    shade = $('<div><img style="width: 60px;margin: 40px auto 0 auto;cursor: pointer" src="'
                        + shade_src + '"/></div>');
                    shade.click(function() {
                        videoViewer.onView(video.name, {
                            dir: video.dir,
                            $file: item
                        });
                    });
                }
                shade.addClass('shade');

                var link = $('<a href="#" style="margin: 0 auto"></a>');
                var thumbnail = OC.webroot + '/core/img/filetypes/video.svg';
                link.html('<img id="video-'+video.fileid+'" class="thumb" src="'+thumbnail+'" />');

                var data = {
                    fileid: video.fileid,
                    path: video.path
                };

                //get the thumbnail of the video
                $.getJSON(OC.generateUrl('/apps/videos/api/get_thumbnail'), data, function (resp) {
                    if (resp.success) {
                        var thumbnail = OC.webroot + resp.path;
                        $('#video-' + video.fileid).attr('src', thumbnail);
                    }
                });

                item.append(shade);
                item.append(link);
                item.append('<p class="videoName">'+video.name+'</p>');

                $('#videos').append(item);

            });


            //set the width of shade
            function setwidth() {
                var _width = $('.thumb').css('width');
                $('.shade').css("width", _width);
            }

            setwidth();
            $(window).resize(setwidth); //reset the width of shade while window resizing.

            //mouse enter the video-item
            $('.video-item a img').mouseenter(function () {
                $('.shade').hide();
                $(this).parent().parent().find('.shade').show();
            });

            //mouse leave the video-item
            $('.shade').mouseleave(function () {
                $('.shade').hide();
            });

            //mouse enter the video-image
            $('.shade img').mouseenter(function () {
                $(this).parent().css("opacity","0.4")
            });

            //mouse leave the video-image
            $('.shade img').mouseleave(function () {
                $(this).parent().css("opacity","0.2")
            });
        },
        error: function() {
            $('#emptycontent').css('display', 'block');
            $('#errormsg').css('display', 'block');
        }
    });

});
